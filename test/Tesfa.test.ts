import { expect } from "chai";
import { ethers } from "hardhat";
import { time } from "@nomicfoundation/hardhat-network-helpers";

const ONE = 10n ** 18n;

function mulDiv(a: bigint, b: bigint, d: bigint): bigint {
  return (a * b) / d;
}

function demTier(balWei: bigint, fromTsf: bigint, toTsf: bigint, ppm: bigint): bigint {
  const fromWei = fromTsf * ONE;
  if (balWei <= fromWei) return 0n;
  const toWei = toTsf * ONE;
  const upper = balWei < toWei ? balWei : toWei;
  if (upper <= fromWei) return 0n;
  const slice = upper - fromWei;
  return (slice * ppm) / 1_000_000n;
}

function demAbove(balWei: bigint, fromTsf: bigint, ppm: bigint): bigint {
  const fromWei = fromTsf * ONE;
  if (balWei <= fromWei) return 0n;
  const slice = balWei - fromWei;
  return (slice * ppm) / 1_000_000n;
}

function demurrageAmount(balWei: bigint): bigint {
  if (balWei <= 10n * ONE) return 0n;
  let dem = 0n;
  dem += demTier(balWei, 10n, 100n, 19n);
  dem += demTier(balWei, 100n, 1000n, 38n);
  dem += demTier(balWei, 1000n, 10_000n, 77n);
  dem += demTier(balWei, 10_000n, 100_000n, 135n);
  dem += demAbove(balWei, 100_000n, 192n);
  return dem;
}

// Hash phone number like contract does
function hashPhone(phone: string): string {
  return ethers.keccak256(ethers.toUtf8Bytes(phone));
}

describe("Tesfa (TSF) - Final Architecture", function () {
  async function deploy(): Promise<any> {
    const [platformAdmin] = await ethers.getSigners();
    const Tesfa = await ethers.getContractFactory("Tesfa");
    const tesfa = await Tesfa.deploy(platformAdmin.address);
    await tesfa.waitForDeployment();
    return tesfa as any;
  }

  async function setExactBalance(tesfa: any, holder: any, counterparty: any, desired: bigint) {
    const cur = await tesfa.balanceOf(holder.address);
    if (cur > desired) {
      await tesfa.connect(holder).transfer(counterparty.address, cur - desired);
    } else if (cur < desired) {
      await tesfa.connect(counterparty).transfer(holder.address, desired - cur);
    }
    expect(await tesfa.balanceOf(holder.address)).to.equal(desired);
  }

  // ============ REGISTRATION TESTS ============

  describe("register(phoneHash)", function () {
    it("registers a new user with phone and sets timestamps", async function () {
      const tesfa = await deploy();
      const [, user] = await ethers.getSigners();
      const phoneHash = hashPhone("+972501234567");

      const before = await time.latest();
      const tx = await tesfa.connect(user).register(phoneHash);
      const receipt = await tx.wait();
      const after = await time.latest();

      expect(await tesfa.isRegistered(user.address)).to.equal(true);
      expect(await tesfa.totalRegistered()).to.equal(1n);
      expect(await tesfa.phoneToWallet(phoneHash)).to.equal(user.address);
      expect(await tesfa.walletToPhone(user.address)).to.equal(phoneHash);

      const lastActivity = await tesfa.lastActivity(user.address);
      expect(lastActivity).to.be.gte(before);
      expect(lastActivity).to.be.lte(after);

      const ev = receipt!.logs.find((l: any) => l.fragment?.name === "Registered");
      expect(ev).to.not.equal(undefined);
      expect(ev.args.user).to.equal(user.address);
      expect(ev.args.phoneHash).to.equal(phoneHash);
    });

    it("rejects double registration", async function () {
      const tesfa = await deploy();
      const [, user] = await ethers.getSigners();
      const phoneHash = hashPhone("+972501234567");

      await tesfa.connect(user).register(phoneHash);
      await expect(tesfa.connect(user).register(phoneHash)).to.be.revertedWith("TSF: already registered");
    });

    it("rejects registration with already-used phone", async function () {
      const tesfa = await deploy();
      const [, user1, user2] = await ethers.getSigners();
      const phoneHash = hashPhone("+972501234567");

      await tesfa.connect(user1).register(phoneHash);
      await expect(tesfa.connect(user2).register(phoneHash)).to.be.revertedWith("TSF: phone already linked");
    });

    it("rejects empty phone hash", async function () {
      const tesfa = await deploy();
      const [, user] = await ethers.getSigners();

      await expect(tesfa.connect(user).register(ethers.ZeroHash)).to.be.revertedWith("TSF: empty phone");
    });

    it("claims pending TSF on registration", async function () {
      const tesfa = await deploy();
      const [platform, business, user] = await ethers.getSigners();
      const phoneHash = hashPhone("+972501234567");

      // Authorize business
      await tesfa.connect(platform).authorizeBusiness(business.address);

      // Business records purchase for unregistered phone
      await tesfa.connect(business).recordPurchase(phoneHash, 10000n); // 100 ILS

      const pendingBefore = await tesfa.pendingTSF(phoneHash);
      expect(pendingBefore).to.be.gt(0n);

      // User registers with the phone
      await tesfa.connect(user).register(phoneHash);

      // Pending should be claimed
      expect(await tesfa.pendingTSF(phoneHash)).to.equal(0n);
      expect(await tesfa.balanceOf(user.address)).to.be.gt(0n);
    });
  });

  // ============ BUSINESS AUTHORIZATION TESTS ============

  describe("Business Authorization", function () {
    it("platform admin can authorize a business", async function () {
      const tesfa = await deploy();
      const [platform, business] = await ethers.getSigners();

      await tesfa.connect(platform).authorizeBusiness(business.address);
      expect(await tesfa.authorizedBusinesses(business.address)).to.equal(true);
    });

    it("non-admin cannot authorize business", async function () {
      const tesfa = await deploy();
      const [, notAdmin, business] = await ethers.getSigners();

      await expect(tesfa.connect(notAdmin).authorizeBusiness(business.address))
        .to.be.revertedWith("TSF: not platform admin");
    });

    it("platform admin can revoke business", async function () {
      const tesfa = await deploy();
      const [platform, business] = await ethers.getSigners();

      await tesfa.connect(platform).authorizeBusiness(business.address);
      await tesfa.connect(platform).revokeBusiness(business.address);
      expect(await tesfa.authorizedBusinesses(business.address)).to.equal(false);
    });
  });

  // ============ PURCHASE (TSF CREATION) TESTS ============

  describe("recordPurchase()", function () {
    it("mints TSF on purchase with correct splits and tax", async function () {
      const tesfa = await deploy();
      const [platform, business, buyer] = await ethers.getSigners();
      const buyerPhone = hashPhone("+972501234567");

      // Setup
      await tesfa.connect(platform).authorizeBusiness(business.address);
      await tesfa.connect(buyer).register(buyerPhone);

      const S0 = await tesfa.totalSupply();
      const amountILS = 10000n; // 100 ILS * 100
      const BASE_RATE: bigint = await tesfa.BASE_RATE();
      const MAX_SUPPLY: bigint = await tesfa.MAX_SUPPLY();

      const rate = (BASE_RATE * (MAX_SUPPLY - S0)) / MAX_SUPPLY;
      const totalMint = mulDiv(amountILS, rate, 100n);
      const tax = mulDiv(totalMint, 150n, 10_000n);
      const net = totalMint - tax;
      const buyerExpected = (net * 60n) / 100n;
      const sellerExpected = net - buyerExpected;

      await tesfa.connect(business).recordPurchase(buyerPhone, amountILS);

      expect(await tesfa.ubiPool()).to.equal(tax);
      expect(await tesfa.balanceOf(buyer.address)).to.equal(buyerExpected);
      expect(await tesfa.balanceOf(business.address)).to.equal(sellerExpected);
    });

    it("creates pending TSF for unregistered buyer", async function () {
      const tesfa = await deploy();
      const [platform, business] = await ethers.getSigners();
      const buyerPhone = hashPhone("+972501234567");

      await tesfa.connect(platform).authorizeBusiness(business.address);

      // Record purchase for unregistered phone
      await tesfa.connect(business).recordPurchase(buyerPhone, 10000n);

      expect(await tesfa.pendingTSF(buyerPhone)).to.be.gt(0n);
      // Business still gets their share
      expect(await tesfa.balanceOf(business.address)).to.be.gt(0n);
    });

    it("rejects unauthorized caller", async function () {
      const tesfa = await deploy();
      const [, notBusiness] = await ethers.getSigners();
      const phoneHash = hashPhone("+972501234567");

      await expect(tesfa.connect(notBusiness).recordPurchase(phoneHash, 10000n))
        .to.be.revertedWith("TSF: not authorized business");
    });

    it("rate decreases as supply grows", async function () {
      const tesfa = await deploy();
      const [platform, business, buyer] = await ethers.getSigners();
      const buyerPhone = hashPhone("+972501234567");

      await tesfa.connect(platform).authorizeBusiness(business.address);
      await tesfa.connect(buyer).register(buyerPhone);

      const MAX_SUPPLY: bigint = await tesfa.MAX_SUPPLY();
      const BASE_RATE: bigint = await tesfa.BASE_RATE();

      const rate0 = (BASE_RATE * (MAX_SUPPLY - 0n)) / MAX_SUPPLY;
      await tesfa.connect(business).recordPurchase(buyerPhone, 100_000_000n);
      const S1 = await tesfa.totalSupply();
      const rate1 = (BASE_RATE * (MAX_SUPPLY - S1)) / MAX_SUPPLY;

      expect(rate1).to.be.lt(rate0);
    });
  });

  // ============ BARTER TESTS ============

  describe("recordBarter()", function () {
    it("mints TSF 50/50 for both parties via facilitator", async function () {
      const tesfa = await deploy();
      const [platform, partyA, partyB] = await ethers.getSigners();
      const phoneA = hashPhone("+972501111111");
      const phoneB = hashPhone("+972502222222");

      // Both register
      await tesfa.connect(partyA).register(phoneA);
      await tesfa.connect(partyB).register(phoneB);

      // Platform is default barter facilitator
      const valueILS = 50000n; // 500 ILS

      const S0 = await tesfa.totalSupply();
      const BASE_RATE: bigint = await tesfa.BASE_RATE();
      const MAX_SUPPLY: bigint = await tesfa.MAX_SUPPLY();

      const rate = (BASE_RATE * (MAX_SUPPLY - S0)) / MAX_SUPPLY;
      const totalMint = mulDiv(valueILS, rate, 100n);
      const tax = mulDiv(totalMint, 150n, 10_000n);
      const net = totalMint - tax;
      const eachExpected = net / 2n;

      await tesfa.connect(platform).recordBarter(phoneA, phoneB, valueILS);

      expect(await tesfa.balanceOf(partyA.address)).to.equal(eachExpected);
      expect(await tesfa.balanceOf(partyB.address)).to.equal(eachExpected);
      expect(await tesfa.ubiPool()).to.equal(tax);
    });

    it("creates pending for unregistered party", async function () {
      const tesfa = await deploy();
      const [platform, partyA] = await ethers.getSigners();
      const phoneA = hashPhone("+972501111111");
      const phoneB = hashPhone("+972502222222");

      await tesfa.connect(partyA).register(phoneA);
      // partyB is NOT registered

      await tesfa.connect(platform).recordBarter(phoneA, phoneB, 50000n);

      expect(await tesfa.balanceOf(partyA.address)).to.be.gt(0n);
      expect(await tesfa.pendingTSF(phoneB)).to.be.gt(0n);
    });

    it("rejects unauthorized facilitator", async function () {
      const tesfa = await deploy();
      const [, notFacilitator] = await ethers.getSigners();
      const phoneA = hashPhone("+972501111111");
      const phoneB = hashPhone("+972502222222");

      await expect(tesfa.connect(notFacilitator).recordBarter(phoneA, phoneB, 50000n))
        .to.be.revertedWith("TSF: not authorized facilitator");
    });

    it("rejects same party barter", async function () {
      const tesfa = await deploy();
      const [platform] = await ethers.getSigners();
      const phoneA = hashPhone("+972501111111");

      await expect(tesfa.connect(platform).recordBarter(phoneA, phoneA, 50000n))
        .to.be.revertedWith("TSF: same party");
    });
  });

  // ============ UBI TESTS ============

  describe("claimUBI()", function () {
    it("reverts if not personal account", async function () {
      const tesfa = await deploy();
      const [, user] = await ethers.getSigners();
      await expect(tesfa.connect(user).claimUBI()).to.be.revertedWith("TSF: not personal account");
    });

    it("reverts if pool empty", async function () {
      const tesfa = await deploy();
      const [, user] = await ethers.getSigners();
      const phoneHash = hashPhone("+972501234567");
      await tesfa.connect(user).register(phoneHash);
      await expect(tesfa.connect(user).claimUBI()).to.be.revertedWith("TSF: pool empty");
    });

    it("claims reduce ubiPool and mint to claimer", async function () {
      const tesfa = await deploy();
      const [platform, business, user1, user2] = await ethers.getSigners();
      const phone1 = hashPhone("+972501111111");
      const phone2 = hashPhone("+972502222222");

      await tesfa.connect(platform).authorizeBusiness(business.address);
      await tesfa.connect(user1).register(phone1);
      await tesfa.connect(user2).register(phone2);

      // Create pool via purchase
      await tesfa.connect(business).recordPurchase(phone1, 1_000_000n);
      const pool0 = await tesfa.ubiPool();
      expect(pool0).to.be.gt(0n);

      const totalRegistered = await tesfa.totalRegistered();
      const share0 = pool0 / totalRegistered;

      const balBefore = await tesfa.balanceOf(user2.address);
      await tesfa.connect(user2).claimUBI();
      const balAfter = await tesfa.balanceOf(user2.address);
      expect(balAfter - balBefore).to.equal(share0);
    });
  });

  // ============ DEMURRAGE TESTS ============

  describe("collectDemurrage()", function () {
    it("collects demurrage after 7 days", async function () {
      const tesfa = await deploy();
      const [platform, business, target, hunter] = await ethers.getSigners();
      const targetPhone = hashPhone("+972501111111");
      const hunterPhone = hashPhone("+972502222222");

      await tesfa.connect(platform).authorizeBusiness(business.address);
      await tesfa.connect(target).register(targetPhone);
      await tesfa.connect(hunter).register(hunterPhone);

      // Give target some TSF via purchase
      await tesfa.connect(business).recordPurchase(targetPhone, 10_000_000n);
      const targetBal = await tesfa.balanceOf(target.address);
      expect(targetBal).to.be.gt(50n * ONE);

      await time.increase(7n * 24n * 60n * 60n);

      const poolBefore = await tesfa.ubiPool();
      await tesfa.connect(hunter).collectDemurrage(target.address);
      
      // Hunter should get some reward
      expect(await tesfa.balanceOf(hunter.address)).to.be.gt(0n);
      // Pool should increase
      expect(await tesfa.ubiPool()).to.be.gt(poolBefore);
    });

    it("reverts if collecting before 7 days", async function () {
      const tesfa = await deploy();
      const [platform, business, target, hunter] = await ethers.getSigners();
      const targetPhone = hashPhone("+972501111111");
      const hunterPhone = hashPhone("+972502222222");

      await tesfa.connect(platform).authorizeBusiness(business.address);
      await tesfa.connect(target).register(targetPhone);
      await tesfa.connect(hunter).register(hunterPhone);

      await tesfa.connect(business).recordPurchase(targetPhone, 1_000_000n);

      await expect(tesfa.connect(hunter).collectDemurrage(target.address))
        .to.be.revertedWith("TSF: not due");
    });
  });

  // ============ INACTIVE RECOVERY TESTS ============

  describe("recoverInactive()", function () {
    it("recovers TSF after 4 years inactivity", async function () {
      const tesfa = await deploy();
      const [platform, business, user, other] = await ethers.getSigners();
      const userPhone = hashPhone("+972501111111");
      const otherPhone = hashPhone("+972502222222");

      await tesfa.connect(platform).authorizeBusiness(business.address);
      await tesfa.connect(user).register(userPhone);
      await tesfa.connect(other).register(otherPhone);

      // Give user some TSF
      await tesfa.connect(business).recordPurchase(userPhone, 1_000_000n);
      const bal = await tesfa.balanceOf(user.address);
      expect(bal).to.be.gt(0n);
      expect(bal).to.be.lte(1000n * ONE); // Under threshold

      // Advance 4+ years
      await time.increase(4n * 365n * 24n * 60n * 60n + 10n);

      const poolBefore = await tesfa.ubiPool();
      await tesfa.recoverInactive(user.address);

      expect(await tesfa.balanceOf(user.address)).to.equal(0n);
      expect(await tesfa.ubiPool()).to.be.gt(poolBefore);
    });

    it("reverts if still active", async function () {
      const tesfa = await deploy();
      const [, user] = await ethers.getSigners();
      const phoneHash = hashPhone("+972501234567");
      await tesfa.connect(user).register(phoneHash);

      await expect(tesfa.recoverInactive(user.address)).to.be.revertedWith("TSF: still active");
    });
  });

  // ============ EDGE CASES ============

  describe("edge cases", function () {
    it("Supply=0 => rate=BASE_RATE; Supply=MAX/2 => rate=BASE/2; Supply=MAX => rate=0", async function () {
      const tesfa = await deploy();
      const MAX_SUPPLY = await tesfa.MAX_SUPPLY();
      const BASE_RATE = await tesfa.BASE_RATE();

      const rate0 = (BASE_RATE * (MAX_SUPPLY - 0n)) / MAX_SUPPLY;
      expect(rate0).to.equal(BASE_RATE);

      const half = MAX_SUPPLY / 2n;
      const rateHalf = (BASE_RATE * (MAX_SUPPLY - half)) / MAX_SUPPLY;
      expect(rateHalf).to.equal(BASE_RATE / 2n);

      const rateMax = (BASE_RATE * (MAX_SUPPLY - MAX_SUPPLY)) / MAX_SUPPLY;
      expect(rateMax).to.equal(0n);
    });

    it("TAX_RATE is immutable at 1.5%", async function () {
      const tesfa = await deploy();
      const TAX_RATE = await tesfa.TAX_RATE();
      expect(TAX_RATE).to.equal(150n); // 150 basis points = 1.5%
    });

    it("MAX_SUPPLY is immutable at 21M", async function () {
      const tesfa = await deploy();
      const MAX_SUPPLY = await tesfa.MAX_SUPPLY();
      expect(MAX_SUPPLY).to.equal(21_000_000n * ONE);
    });
  });

  // ============ INTEGRATION TESTS ============

  describe("integration smoke", function () {
    it("full flow: register -> purchase -> barter -> demurrage -> UBI", async function () {
      const tesfa = await deploy();
      const [platform, business, buyer, partyA, partyB] = await ethers.getSigners();
      const buyerPhone = hashPhone("+972501111111");
      const phoneA = hashPhone("+972502222222");
      const phoneB = hashPhone("+972503333333");

      // Setup
      await tesfa.connect(platform).authorizeBusiness(business.address);
      await tesfa.connect(buyer).register(buyerPhone);
      await tesfa.connect(partyA).register(phoneA);
      await tesfa.connect(partyB).register(phoneB);

      // Purchase creates TSF
      await tesfa.connect(business).recordPurchase(buyerPhone, 5_000_000n);
      expect(await tesfa.totalSupply()).to.be.gt(0n);
      expect(await tesfa.ubiPool()).to.be.gt(0n);

      // Barter creates more TSF
      await tesfa.connect(platform).recordBarter(phoneA, phoneB, 2_000_000n);
      expect(await tesfa.balanceOf(partyA.address)).to.be.gt(0n);
      expect(await tesfa.balanceOf(partyB.address)).to.be.gt(0n);

      // Wait and collect demurrage
      await time.increase(7n * 24n * 60n * 60n);
      const poolBefore = await tesfa.ubiPool();
      await tesfa.connect(partyA).collectDemurrage(buyer.address);
      expect(await tesfa.ubiPool()).to.be.gt(poolBefore);

      // Claim UBI
      const balBefore = await tesfa.balanceOf(partyB.address);
      await tesfa.connect(partyB).claimUBI();
      expect(await tesfa.balanceOf(partyB.address)).to.be.gt(balBefore);
    });

    it("100 purchases increases supply monotonically", async function () {
      const tesfa = await deploy();
      const [platform, business, buyer] = await ethers.getSigners();
      const buyerPhone = hashPhone("+972501234567");

      await tesfa.connect(platform).authorizeBusiness(business.address);
      await tesfa.connect(buyer).register(buyerPhone);

      let prev = await tesfa.totalSupply();
      for (let i = 0; i < 100; i++) {
        await tesfa.connect(business).recordPurchase(buyerPhone, 1_000_000n);
        const cur = await tesfa.totalSupply();
        expect(cur).to.be.gte(prev);
        prev = cur;
      }
    });

    it("transfers do NOT create new TSF", async function () {
      const tesfa = await deploy();
      const [platform, business, sender, receiver] = await ethers.getSigners();
      const senderPhone = hashPhone("+972501111111");
      const receiverPhone = hashPhone("+972502222222");

      await tesfa.connect(platform).authorizeBusiness(business.address);
      await tesfa.connect(sender).register(senderPhone);
      await tesfa.connect(receiver).register(receiverPhone);

      // Create some TSF via purchase
      await tesfa.connect(business).recordPurchase(senderPhone, 10_000_000n);
      const supplyBefore = await tesfa.totalSupply();
      const senderBal = await tesfa.balanceOf(sender.address);

      // Transfer between users
      await tesfa.connect(sender).transfer(receiver.address, senderBal / 2n);

      // Supply should NOT change from transfer
      expect(await tesfa.totalSupply()).to.equal(supplyBefore);
    });
  });
});
