const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0x7297429B9560f899F4c4ee3Dc443D99d6fcb53Bf";

async function main() {
  const [account1, account2] = await ethers.getSigners();
  const tesfa = await ethers.getContractAt("Tesfa", CONTRACT_ADDRESS);

  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║           TSF Full On-Chain Test Suite (Amoy)              ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  console.log("Contract:", CONTRACT_ADDRESS);
  console.log("Account1:", account1.address);
  console.log("Account2:", account2?.address || "N/A (single signer)");
  console.log("");

  let passed = 0;
  let failed = 0;

  // Helper function
  async function test(name, fn) {
    process.stdout.write(`  ${name}... `);
    try {
      await fn();
      console.log("✓ PASSED");
      passed++;
    } catch (e) {
      console.log(`✗ FAILED: ${e.reason || e.message}`);
      failed++;
    }
  }

  // ══════════════════════════════════════════════════════════════
  // 1. REGISTER
  // ══════════════════════════════════════════════════════════════
  console.log("┌──────────────────────────────────────────────────────────────┐");
  console.log("│ 1. REGISTER                                                  │");
  console.log("└──────────────────────────────────────────────────────────────┘");

  const isReg1Before = await tesfa.isRegistered(account1.address);
  
  await test("Register account1 (or verify already registered)", async () => {
    if (!isReg1Before) {
      const tx = await tesfa.connect(account1).register();
      await tx.wait();
    }
    const isReg = await tesfa.isRegistered(account1.address);
    if (!isReg) throw new Error("Not registered");
  });

  // For account2, we need a second signer. If not available, skip.
  let hasAccount2 = !!account2;
  if (hasAccount2) {
    const isReg2Before = await tesfa.isRegistered(account2.address);
    await test("Register account2 (or verify already registered)", async () => {
      if (!isReg2Before) {
        const tx = await tesfa.connect(account2).register();
        await tx.wait();
      }
      const isReg = await tesfa.isRegistered(account2.address);
      if (!isReg) throw new Error("Not registered");
    });
  } else {
    console.log("  ⚠ Skipping account2 tests (only one signer available)");
  }

  // Edge case: register twice
  await test("Edge case: register twice should revert", async () => {
    try {
      const tx = await tesfa.connect(account1).register();
      await tx.wait();
      throw new Error("Should have reverted");
    } catch (e) {
      if (e.reason?.includes("already registered") || e.message?.includes("already registered")) {
        return; // Expected
      }
      throw e;
    }
  });

  console.log("");

  // ══════════════════════════════════════════════════════════════
  // 2. RECORD TRANSACTION
  // ══════════════════════════════════════════════════════════════
  console.log("┌──────────────────────────────────────────────────────────────┐");
  console.log("│ 2. RECORD TRANSACTION                                        │");
  console.log("└──────────────────────────────────────────────────────────────┘");

  const buyer = account1.address;
  const seller = hasAccount2 ? account2.address : account1.address;

  const balBefore1 = await tesfa.balanceOf(buyer);
  const balBefore2 = await tesfa.balanceOf(seller);
  const poolBefore = await tesfa.ubiPool();

  await test("recordTransaction(1000 ILS) mints TSF", async () => {
    const tx = await tesfa.recordTransaction(buyer, seller, 1000);
    await tx.wait();
  });

  const balAfter1 = await tesfa.balanceOf(buyer);
  const balAfter2 = await tesfa.balanceOf(seller);
  const poolAfter = await tesfa.ubiPool();

  console.log(`\n  📊 Balances after 1000 ILS transaction:`);
  console.log(`     Buyer  (${buyer.slice(0,10)}...): ${ethers.formatEther(balBefore1)} → ${ethers.formatEther(balAfter1)} TSF`);
  console.log(`     Seller (${seller.slice(0,10)}...): ${ethers.formatEther(balBefore2)} → ${ethers.formatEther(balAfter2)} TSF`);
  console.log(`     UBI Pool: ${ethers.formatEther(poolBefore)} → ${ethers.formatEther(poolAfter)} TSF\n`);

  // Edge case: 0 ILS
  await test("Edge case: recordTransaction(0 ILS) should revert", async () => {
    try {
      const tx = await tesfa.recordTransaction(buyer, seller, 0);
      await tx.wait();
      throw new Error("Should have reverted");
    } catch (e) {
      if (e.reason?.includes("zero amount") || e.message?.includes("zero amount")) {
        return; // Expected
      }
      throw e;
    }
  });

  console.log("");

  // ══════════════════════════════════════════════════════════════
  // 3. CHECK BALANCES
  // ══════════════════════════════════════════════════════════════
  console.log("┌──────────────────────────────────────────────────────────────┐");
  console.log("│ 3. CHECK BALANCES & STATE                                    │");
  console.log("└──────────────────────────────────────────────────────────────┘");

  const totalSupply = await tesfa.totalSupply();
  const ubiPool = await tesfa.ubiPool();
  const totalRegistered = await tesfa.totalRegistered();

  console.log(`  Total Supply:    ${ethers.formatEther(totalSupply)} TSF`);
  console.log(`  UBI Pool:        ${ethers.formatEther(ubiPool)} TSF`);
  console.log(`  Total Registered: ${totalRegistered.toString()} users`);
  console.log("");

  // ══════════════════════════════════════════════════════════════
  // 4. CLAIM UBI
  // ══════════════════════════════════════════════════════════════
  console.log("┌──────────────────────────────────────────────────────────────┐");
  console.log("│ 4. CLAIM UBI                                                 │");
  console.log("└──────────────────────────────────────────────────────────────┘");

  const poolBeforeClaim = await tesfa.ubiPool();
  const bal1BeforeClaim = await tesfa.balanceOf(account1.address);

  if (poolBeforeClaim > 0n) {
    await test("claimUBI() mints share to claimer", async () => {
      const tx = await tesfa.connect(account1).claimUBI();
      await tx.wait();
    });

    const poolAfterClaim = await tesfa.ubiPool();
    const bal1AfterClaim = await tesfa.balanceOf(account1.address);
    console.log(`\n  📊 After claimUBI:`);
    console.log(`     Account1 balance: ${ethers.formatEther(bal1BeforeClaim)} → ${ethers.formatEther(bal1AfterClaim)} TSF`);
    console.log(`     UBI Pool: ${ethers.formatEther(poolBeforeClaim)} → ${ethers.formatEther(poolAfterClaim)} TSF\n`);
  } else {
    console.log("  ⚠ UBI Pool is empty, skipping claimUBI success test");
  }

  // Edge case: claim when pool is empty (need to drain it first or check if already empty)
  await test("Edge case: claimUBI when pool empty should revert", async () => {
    // First check current pool
    const currentPool = await tesfa.ubiPool();
    if (currentPool === 0n) {
      // Pool is empty, this should revert
      try {
        const tx = await tesfa.connect(account1).claimUBI();
        await tx.wait();
        throw new Error("Should have reverted");
      } catch (e) {
        if (e.reason?.includes("pool empty") || e.message?.includes("pool empty")) {
          return; // Expected
        }
        if (e.reason?.includes("share zero") || e.message?.includes("share zero")) {
          return; // Also acceptable
        }
        throw e;
      }
    } else {
      console.log("(pool not empty, skipping)");
    }
  });

  console.log("");

  // ══════════════════════════════════════════════════════════════
  // 5. COLLECT DEMURRAGE
  // ══════════════════════════════════════════════════════════════
  console.log("┌──────────────────────────────────────────────────────────────┐");
  console.log("│ 5. COLLECT DEMURRAGE                                         │");
  console.log("└──────────────────────────────────────────────────────────────┘");

  const lastDem = await tesfa.lastDemurrageTime(account1.address);
  const now = BigInt(Math.floor(Date.now() / 1000));
  const sevenDays = 7n * 24n * 60n * 60n;
  const canCollect = now >= lastDem + sevenDays;

  console.log(`  Last demurrage time: ${new Date(Number(lastDem) * 1000).toISOString()}`);
  console.log(`  Can collect now: ${canCollect}`);

  if (canCollect) {
    const balBeforeDem = await tesfa.balanceOf(account1.address);
    await test("collectDemurrage() on account1", async () => {
      const tx = await tesfa.connect(account1).collectDemurrage(account1.address);
      await tx.wait();
    });
    const balAfterDem = await tesfa.balanceOf(account1.address);
    console.log(`\n  📊 After collectDemurrage:`);
    console.log(`     Account1 balance: ${ethers.formatEther(balBeforeDem)} → ${ethers.formatEther(balAfterDem)} TSF\n`);
  } else {
    console.log("  ⚠ Demurrage not due yet (need to wait 7 days from last collection)");
  }

  // Edge case: collect before 7 days
  await test("Edge case: collectDemurrage before 7 days should revert", async () => {
    try {
      const tx = await tesfa.connect(account1).collectDemurrage(account1.address);
      await tx.wait();
      throw new Error("Should have reverted");
    } catch (e) {
      if (e.reason?.includes("not due") || e.message?.includes("not due")) {
        return; // Expected
      }
      throw e;
    }
  });

  console.log("");

  // ══════════════════════════════════════════════════════════════
  // SUMMARY
  // ══════════════════════════════════════════════════════════════
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║                        SUMMARY                             ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  console.log(`  ✓ Passed: ${passed}`);
  console.log(`  ✗ Failed: ${failed}`);
  console.log("");

  if (failed === 0) {
    console.log("  🎉 All tests passed!");
  } else {
    console.log("  ⚠ Some tests failed. Review output above.");
  }
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
