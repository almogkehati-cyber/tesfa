import random
from dataclasses import dataclass
from typing import Dict, List, Optional

import matplotlib
import matplotlib.pyplot as plt

random.seed(42)
matplotlib.use("Agg")

# =============================================================================
# Contract-like parameters (human units: TSF, not wei)
# =============================================================================
MAX_SUPPLY = 21_000_000.0
BASE_RATE = 0.1  # 0.1 TSF per 100 ILS, scaled by (MAX_SUPPLY - S)/MAX_SUPPLY
TAX_RATE = 0.015
BUYER_SHARE = 0.60
SELLER_SHARE = 0.40

DEMURRAGE_INTERVAL_DAYS = 7
INACTIVE_PERIOD_DAYS = 4 * 365
INACTIVE_THRESHOLD = 1000.0

ILS_PER_USD = 3.7
BASIC_FOOD_USD_PER_DAY = 5.0

SPEND_RANGES_ILS = {
    "poor": (50.0, 200.0),
    "middle": (200.0, 1000.0),
    "rich": (1000.0, 10000.0),
}
SELL_RANGES_ILS = {
    "small_biz": (500.0, 5000.0),
    "big_biz": (5000.0, 50000.0),
}

# Demurrage tiers: ppm per WEEK (applied per-tier)
DEM_TIERS = [
    (10.0, 100.0, 19),
    (100.0, 1000.0, 38),
    (1000.0, 10_000.0, 77),
    (10_000.0, 100_000.0, 135),
    (100_000.0, float("inf"), 192),
]


def growth_per_day(day: int) -> int:
    year = (day - 1) // 365 + 1
    if year == 1:
        return 10
    if year == 2:
        return 50
    if year == 3:
        return 200
    if year == 4:
        return 500
    return 1000


def rate_from_supply(supply: float) -> float:
    if supply >= MAX_SUPPLY:
        return 0.0
    return BASE_RATE * (MAX_SUPPLY - supply) / MAX_SUPPLY


def mint_from_ils(amount_ils: float, supply: float) -> float:
    r = rate_from_supply(supply)
    if r <= 0:
        return 0.0
    total_mint = (amount_ils * r) / 100.0
    remaining = MAX_SUPPLY - supply
    if remaining <= 0:
        return 0.0
    return min(total_mint, remaining)


def implied_price_usd(supply: float, cap: float = 50_000.0) -> float:
    r = rate_from_supply(supply)
    if r <= 0:
        return cap
    usd = (100.0 / r) / ILS_PER_USD
    return min(usd, cap)


def demurrage_due(balance: float) -> float:
    if balance <= 10.0:
        return 0.0

    dem = 0.0
    for lo, hi, ppm in DEM_TIERS:
        if balance <= lo:
            break
        upper = min(balance, hi)
        slice_amt = max(0.0, upper - lo)
        if slice_amt <= 0:
            continue
        dem += slice_amt * (ppm / 1_000_000.0)
    return dem


@dataclass
class Cohort:
    name: str
    count: int
    balance: float
    ubi_bucket: float


def simulate(years: int = 10):
    days = years * 365

    cohorts: Dict[str, Cohort] = {
        "poor": Cohort("poor", 400, 0.0, 0.0),
        "middle": Cohort("middle", 400, 0.0, 0.0),
        "rich": Cohort("rich", 150, 0.0, 0.0),
        "small_biz": Cohort("small_biz", 40, 0.0, 0.0),
        "big_biz": Cohort("big_biz", 10, 0.0, 0.0),
    }

    def registered() -> int:
        return sum(c.count for c in cohorts.values())

    supply = 0.0
    ubi_pool = 0.0

    # Hunters: 5% active; they collect weekly if demurrage > 0.01 TSF
    HUNTER_SHARE_OF_USERS = 0.05
    HUNTER_MIN_DEM = 0.01

    # Claim behavior (daily)
    claim_rate = {
        "poor": 0.45,
        "middle": 0.30,
        "rich": 0.15,
        "small_biz": 0.05,
        "big_biz": 0.02,
    }

    # Track metrics
    day_hist: List[int] = []
    price_hist: List[float] = []
    supply_hist: List[float] = []

    avg_bal_hist: Dict[str, List[float]] = {k: [] for k in cohorts.keys()}
    avg_ubi_daily_hist: Dict[str, List[float]] = {k: [] for k in cohorts.keys()}

    hunter_daily_hist: List[float] = []
    tax_to_pool_hist: List[float] = []
    dem_to_pool_hist: List[float] = []

    rich_poor_ratio_hist: List[float] = []
    cap_pct_hist: List[float] = []

    inactive_wallets_yearly = [0 for _ in range(years)]

    food_day: Optional[int] = None

    yearly_rows = []

    for day in range(1, days + 1):
        tax_today = 0.0
        dem_to_pool_today = 0.0
        hunter_mint_today = 0.0

        # 1) ILS transactions -> TSF mint
        for uname in ("poor", "middle", "rich"):
            u = cohorts[uname]
            lo, hi = SPEND_RANGES_ILS[uname]

            # sample up to 1500 to approximate distribution
            ils_total = sum(random.uniform(lo, hi) for _ in range(min(u.count, 1500)))
            if u.count > 1500:
                ils_total *= u.count / 1500.0

            txs = max(1, int(round(u.count * (1.2 if uname == "poor" else 1.6 if uname == "middle" else 2.2))))
            ils_per_tx = ils_total / txs

            for _ in range(txs):
                seller = "small_biz" if random.random() < 0.85 else "big_biz"
                m = mint_from_ils(ils_per_tx, supply)
                if m <= 0:
                    continue

                tax = m * TAX_RATE
                ubi_pool += tax
                tax_today += tax

                net = m - tax
                u.balance += net * BUYER_SHARE
                cohorts[seller].balance += net * SELLER_SHARE

                supply += m

        for bname in ("small_biz", "big_biz"):
            b = cohorts[bname]
            slo, shi = SELL_RANGES_ILS[bname]

            ils_total = sum(random.uniform(slo, shi) for _ in range(min(b.count, 200)))
            if b.count > 200:
                ils_total *= b.count / 200.0

            supplier_cost_ratio = 0.60 if bname == "small_biz" else 0.70
            ils_total *= supplier_cost_ratio

            txs = max(1, int(round(b.count * (2.0 if bname == "small_biz" else 3.0))))
            ils_per_tx = ils_total / txs

            for _ in range(txs):
                seller = "big_biz" if random.random() < 0.75 else "small_biz"
                m = mint_from_ils(ils_per_tx, supply)
                if m <= 0:
                    continue

                tax = m * TAX_RATE
                ubi_pool += tax
                tax_today += tax

                net = m - tax
                b.balance += net * BUYER_SHARE
                cohorts[seller].balance += net * SELLER_SHARE

                supply += m

        # 2) Hunters collect demurrage weekly
        if day % DEMURRAGE_INTERVAL_DAYS == 0:
            users_total = cohorts["poor"].count + cohorts["middle"].count + cohorts["rich"].count
            hunters = int(round(users_total * HUNTER_SHARE_OF_USERS))
            hunters = max(hunters, 1)

            for cname, c in cohorts.items():
                if c.count <= 0:
                    continue

                avg_bal = (c.balance + c.ubi_bucket) / c.count
                due = demurrage_due(avg_bal)
                if due <= HUNTER_MIN_DEM:
                    continue

                total_due = due * c.count

                # burn from target
                from_bal = min(c.balance, total_due)
                c.balance -= from_bal
                rem = total_due - from_bal
                if rem > 0:
                    from_ubi = min(c.ubi_bucket, rem)
                    c.ubi_bucket -= from_ubi
                    rem -= from_ubi

                burned = total_due - rem
                if burned <= 0:
                    continue

                supply = max(0.0, supply - burned)

                hunter_mint = burned * 0.10
                to_pool = burned * 0.90

                remaining = MAX_SUPPLY - supply
                if remaining > 0 and hunter_mint > 0:
                    mint_h = min(remaining, hunter_mint)
                    supply += mint_h
                    hunter_mint_today += mint_h

                ubi_pool += to_pool
                dem_to_pool_today += to_pool

        # 3) claimUBI daily (sequential claim approximation)
        reg = registered()
        minted_ubi = 0.0
        if ubi_pool > 0 and reg > 0 and supply < MAX_SUPPLY:
            claims = sum(int(round(cohorts[k].count * claim_rate[k])) for k in cohorts.keys())
            claims = min(claims, reg)
            if claims > 0:
                factor = (1.0 - 1.0 / reg) ** claims
                pool_remaining = ubi_pool * factor
                minted = ubi_pool - pool_remaining

                remaining = MAX_SUPPLY - supply
                minted = min(minted, max(0.0, remaining))

                if minted > 0:
                    total_claims = claims
                    avg_claim = minted / total_claims
                    for k, c in cohorts.items():
                        cclaims = int(round(c.count * claim_rate[k]))
                        if cclaims <= 0:
                            continue
                        c.ubi_bucket += avg_claim * cclaims

                    supply += minted
                    minted_ubi += minted

                ubi_pool = pool_remaining + (ubi_pool - pool_remaining - minted)

        total_claims = max(1, sum(int(round(cohorts[k].count * claim_rate[k])) for k in cohorts.keys()))
        base_claim = minted_ubi / total_claims
        for k, c in cohorts.items():
            cclaims = int(round(c.count * claim_rate[k]))
            avg_ubi_daily_hist[k].append(base_claim * (cclaims / max(1, c.count)))

        # 4) inactive wallets recovered (per-year proxy)
        if day % 365 == 0:
            year_idx = (day // 365) - 1
            inactive_cnt = int(round(0.002 * (cohorts["poor"].count + cohorts["middle"].count + cohorts["rich"].count)))
            inactive_wallets_yearly[year_idx] = inactive_cnt

        # 5) growth
        add = growth_per_day(day)
        if add > 0:
            new_poor = int(round(add * 0.40))
            new_middle = int(round(add * 0.40))
            new_rich = int(round(add * 0.15))
            new_small = int(round(add * 0.04))
            new_big = max(0, add - (new_poor + new_middle + new_rich + new_small))

            cohorts["poor"].count += new_poor
            cohorts["middle"].count += new_middle
            cohorts["rich"].count += new_rich
            cohorts["small_biz"].count += new_small
            cohorts["big_biz"].count += new_big

        # 6) track
        day_hist.append(day)
        supply_hist.append(supply)
        cap_pct_hist.append((supply / MAX_SUPPLY) * 100.0)

        price = implied_price_usd(supply)
        price_hist.append(price)

        for k, c in cohorts.items():
            avg_bal_hist[k].append((c.balance + c.ubi_bucket) / max(1, c.count))

        tax_to_pool_hist.append(tax_today)
        dem_to_pool_hist.append(dem_to_pool_today)
        hunter_daily_hist.append(hunter_mint_today)

        poor_avg = avg_bal_hist["poor"][-1]
        rich_avg = avg_bal_hist["rich"][-1]
        rich_poor_ratio_hist.append((rich_avg / poor_avg) if poor_avg > 0 else float("inf"))

        if food_day is None:
            poor_ubi_usd = avg_ubi_daily_hist["poor"][-1] * price
            if poor_ubi_usd >= BASIC_FOOD_USD_PER_DAY:
                food_day = day

        if day % 365 == 0:
            year = day // 365
            yearly_rows.append(
                {
                    "year": year,
                    "registered": reg,
                    "supply": supply,
                    "cap_pct": cap_pct_hist[-1],
                    "price_usd": price,
                    "avg_poor": poor_avg,
                    "avg_middle": avg_bal_hist["middle"][-1],
                    "avg_rich": rich_avg,
                    "ubi_poor_daily": avg_ubi_daily_hist["poor"][-1],
                    "ubi_poor_monthly": avg_ubi_daily_hist["poor"][-1] * 30,
                    "ubi_poor_yearly": avg_ubi_daily_hist["poor"][-1] * 365,
                    "hunter_tsf_daily": sum(hunter_daily_hist[-365:]) / 365,
                    "pool_tax_daily": sum(tax_to_pool_hist[-365:]) / 365,
                    "pool_dem_daily": sum(dem_to_pool_hist[-365:]) / 365,
                    "inactive_wallets": inactive_wallets_yearly[year - 1],
                }
            )

            r = yearly_rows[-1]
            print(
                f"Year {r['year']:>2} | reg={r['registered']:,} | supply={r['supply']:,.0f} ({r['cap_pct']:.2f}% cap) | "
                f"price=${r['price_usd']:.2f} | poorUBI/day={r['ubi_poor_daily']:.6f} | hunter/day={r['hunter_tsf_daily']:.2f}"
            )

    return {
        "day": day_hist,
        "supply": supply_hist,
        "cap_pct": cap_pct_hist,
        "price_usd": price_hist,
        "avg_bal": avg_bal_hist,
        "avg_ubi_daily": avg_ubi_daily_hist,
        "hunter_daily": hunter_daily_hist,
        "pool_tax": tax_to_pool_hist,
        "pool_dem": dem_to_pool_hist,
        "rich_poor_ratio": rich_poor_ratio_hist,
        "inactive_yearly": inactive_wallets_yearly,
        "food_day": food_day,
        "yearly": yearly_rows,
    }


def print_yearly_table(rows: List[Dict]):
    print("=" * 140)
    print("YEARLY SUMMARY")
    print("=" * 140)
    print(
        "Year | Registered | Supply | %Cap | Price($) | AvgTSF Poor | AvgTSF Mid | AvgTSF Rich | UBI Poor/day | Hunters TSF/day | Pool tax/day | Pool dem/day | Inactive/yr"
    )
    print("-" * 140)
    for r in rows:
        print(
            f"{r['year']:>4} | {r['registered']:>10,} | {r['supply']:>10,.0f} | {r['cap_pct']:>5.2f}% | {r['price_usd']:>8.2f} | "
            f"{r['avg_poor']:>11.2f} | {r['avg_middle']:>10.2f} | {r['avg_rich']:>11.2f} | {r['ubi_poor_daily']:>12.6f} | "
            f"{r['hunter_tsf_daily']:>15.2f} | {r['pool_tax_daily']:>10.2f} | {r['pool_dem_daily']:>10.2f} | {r['inactive_wallets']:>10}"
        )
    print("=" * 140)


def plot_all(results: Dict, out_path: str):
    day = results["day"]

    fig, axes = plt.subplots(4, 2, figsize=(18, 18))
    fig.suptitle("Tesfa (TSF) Full 10-Year Simulation (Demurrage Hunters + UBI Pool)", fontsize=16, fontweight="bold")

    ax = axes[0, 0]
    for k, label in [("poor", "Poor"), ("middle", "Middle"), ("rich", "Rich"), ("small_biz", "Small Biz"), ("big_biz", "Big Biz")]:
        ax.plot(day, results["avg_bal"][k], linewidth=0.8, label=label)
    ax.set_title("Q1: Avg TSF Holdings per Type")
    ax.set_xlabel("Day")
    ax.set_ylabel("TSF")
    ax.legend()
    ax.grid(True, alpha=0.3)

    ax = axes[0, 1]
    for k, label in [("poor", "Poor"), ("middle", "Middle"), ("rich", "Rich")]:
        ax.plot(day, results["avg_ubi_daily"][k], linewidth=0.8, label=label)
    ax.set_title("Q2: Avg UBI (TSF/day) per Type")
    ax.set_xlabel("Day")
    ax.set_ylabel("TSF/day")
    ax.legend()
    ax.grid(True, alpha=0.3)

    ax = axes[1, 0]
    ax.plot(day, results["price_usd"], color="gold", linewidth=0.9)
    ax.set_title("Q3: Implied TSF Price in USD (capped)")
    ax.set_xlabel("Day")
    ax.set_ylabel("USD/TSF")
    ax.grid(True, alpha=0.3)

    ax = axes[1, 1]
    ax.plot(day, results["cap_pct"], color="blue", linewidth=0.9)
    ax.set_title("Q7: Progress Toward 21M Cap (%)")
    ax.set_xlabel("Day")
    ax.set_ylabel("% of MAX_SUPPLY")
    ax.grid(True, alpha=0.3)

    ax = axes[2, 0]
    ax.plot(day, results["hunter_daily"], color="#d62728", linewidth=0.9)
    ax.set_title("Q3: Hunters Mint (TSF/day)")
    ax.set_xlabel("Day")
    ax.set_ylabel("TSF/day")
    ax.grid(True, alpha=0.3)

    ax = axes[2, 1]
    ax.plot(day, results["pool_tax"], label="Tax->Pool", linewidth=0.7)
    ax.plot(day, results["pool_dem"], label="Demurrage->Pool", linewidth=0.7)
    ax.set_title("Q4: UBI Pool Growth (Daily) from Tax vs Demurrage")
    ax.set_xlabel("Day")
    ax.set_ylabel("TSF")
    ax.legend()
    ax.grid(True, alpha=0.3)

    ax = axes[3, 0]
    ax.plot(day, results["rich_poor_ratio"], color="purple", linewidth=0.9)
    ax.set_title("Q6: Rich / Poor Avg Holdings Ratio")
    ax.set_xlabel("Day")
    ax.set_ylabel("Ratio")
    ax.grid(True, alpha=0.3)

    ax = axes[3, 1]
    years = list(range(1, 11))
    ax.bar(years, results["inactive_yearly"], color="#7f7f7f")
    ax.set_title("Q8: Inactive Wallets Recovered to UBI Pool (per year, proxy)")
    ax.set_xlabel("Year")
    ax.set_ylabel("Wallets")
    ax.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.savefig(out_path, dpi=150, bbox_inches="tight")
    plt.close(fig)


if __name__ == "__main__":
    results = simulate(years=10)
    print_yearly_table(results["yearly"])

    if results["food_day"] is not None:
        print(f"\nQ5: UBI becomes enough for basic food ($5/day for poor) on day: {results['food_day']}")
    else:
        print("\nQ5: UBI never reaches basic food threshold ($5/day) within 10 years.")

    out = "simulation/tesfa_full_sim.png"
    plot_all(results, out)
    print(f"\nSaved to: {out}")
