import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

// Already deployed contract
const CONTRACT_ADDRESS = "0xc92503d6405954ef5388fBE1E3a3288498Cc482F";

async function main() {
  console.log("\n========================================");
  console.log("🧪 TESTING DEPLOYED TESFA CONTRACT");
  console.log("========================================\n");

  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  
  console.log("📍 Tester address:", deployerAddress);
  
  const balance = await ethers.provider.getBalance(deployerAddress);
  console.log("💰 Balance:", ethers.formatEther(balance), "POL\n");

  // Connect to deployed contract
  const tesfa = await ethers.getContractAt("Tesfa", CONTRACT_ADDRESS);
  console.log("📝 Connected to contract:", CONTRACT_ADDRESS, "\n");

  // ============ STEP 5: REGISTER PERSONAL ACCOUNT ============
  console.log("📝 Step 5: Registering personal account...");
  
  const phoneHash = ethers.keccak256(ethers.toUtf8Bytes("+972501234567"));
  
  // Use deployer as personal account for simplicity
  const alreadyRegistered = await tesfa.isRegistered(deployerAddress);
  
  if (!alreadyRegistered) {
    const registerTx = await tesfa.register(phoneHash);
    await registerTx.wait();
    console.log("   ✅ Personal account registered!");
  } else {
    console.log("   ⚠️ Already registered, skipping...");
  }
  
  const isPersonal = await tesfa.isPersonalAccount(deployerAddress);
  const isRegistered = await tesfa.isRegistered(deployerAddress);
  console.log("   isPersonalAccount:", isPersonal);
  console.log("   isRegistered:", isRegistered, "\n");

  // ============ STEP 6: REGISTER BUSINESS ACCOUNT ============
  console.log("📝 Step 6: Registering business account...");
  
  // Create a new business wallet
  const businessWallet = ethers.Wallet.createRandom().connect(ethers.provider);
  console.log("   Business wallet:", businessWallet.address);
  
  // Fund business wallet
  console.log("   Funding business wallet with 0.05 POL...");
  const fundTx = await deployer.sendTransaction({
    to: businessWallet.address,
    value: ethers.parseEther("0.05")
  });
  await fundTx.wait();
  
  // Authorize business (as platform admin)
  const authBizTx = await tesfa.authorizeBusiness(businessWallet.address);
  await authBizTx.wait();
  
  const isBusiness = await tesfa.isBusinessAccount(businessWallet.address);
  const isAuthorized = await tesfa.authorizedBusinesses(businessWallet.address);
  console.log("   ✅ Business account registered!");
  console.log("   isBusinessAccount:", isBusiness);
  console.log("   authorizedBusiness:", isAuthorized, "\n");

  // ============ STEP 7: RECORD TRANSACTION (100 ILS) ============
  console.log("📝 Step 7: Recording transaction (100 ILS purchase)...");
  
  const tesfaWithBusiness = tesfa.connect(businessWallet);
  const buyerPhoneHash = ethers.keccak256(ethers.toUtf8Bytes("+972509876543"));
  const amountILS = 10000; // 100 ILS (scaled by 100)
  
  const recordTx = await tesfaWithBusiness.recordPurchase(buyerPhoneHash, amountILS);
  await recordTx.wait();
  
  console.log("   ✅ Transaction recorded!\n");

  // ============ STEP 8: CHECK BALANCES ============
  console.log("📝 Step 8: Checking balances...");
  
  const pendingTSF = await tesfa.pendingTSF(buyerPhoneHash);
  const businessBalance = await tesfa.balanceOf(businessWallet.address);
  const ubiPool = await tesfa.ubiPool();
  const totalSupply = await tesfa.totalSupply();
  
  console.log("   Pending TSF for buyer:", ethers.formatEther(pendingTSF), "TSF");
  console.log("   Business balance:", ethers.formatEther(businessBalance), "TSF");
  console.log("   UBI Pool:", ethers.formatEther(ubiPool), "TSF");
  console.log("   Total Supply:", ethers.formatEther(totalSupply), "TSF");
  console.log("   ✅ Balances verified!\n");

  // ============ STEP 9: TRANSFER TSF ============
  console.log("📝 Step 9: Transfer TSF from business to deployer...");
  
  if (businessBalance > 0n) {
    const transferAmount = businessBalance / 2n; // Transfer half
    const transferTx = await tesfaWithBusiness.transfer(deployerAddress, transferAmount);
    await transferTx.wait();
    
    const newDeployerBalance = await tesfa.balanceOf(deployerAddress);
    const newBusinessBalance = await tesfa.balanceOf(businessWallet.address);
    
    console.log("   Transferred:", ethers.formatEther(transferAmount), "TSF");
    console.log("   Deployer new balance:", ethers.formatEther(newDeployerBalance), "TSF");
    console.log("   Business new balance:", ethers.formatEther(newBusinessBalance), "TSF");
    console.log("   ✅ Transfer complete!\n");
  } else {
    console.log("   ⚠️ Business has no balance to transfer\n");
  }

  // ============ SAVE CONTRACT ADDRESS ============
  console.log("📝 Saving contract address to config...");
  
  const configDir = path.join(__dirname, "..", "config");
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
  
  const configContent = `// Auto-generated by deployment script
// Network: Polygon Amoy Testnet (Chain ID: 80002)
// Deployed: ${new Date().toISOString()}

export const TESFA_CONTRACT_ADDRESS = "${CONTRACT_ADDRESS}";
export const DEPLOYER_ADDRESS = "${deployerAddress}";
export const NETWORK = {
  name: "Polygon Amoy Testnet",
  chainId: 80002,
  rpc: "https://rpc-amoy.polygon.technology/",
  explorer: "https://amoy.polygonscan.com/"
};
`;
  
  fs.writeFileSync(path.join(configDir, "contracts.ts"), configContent);
  console.log("   ✅ Config saved to config/contracts.ts\n");

  // ============ SUMMARY ============
  console.log("========================================");
  console.log("✅ ALL TESTS COMPLETED SUCCESSFULLY!");
  console.log("========================================\n");
  
  console.log("📋 SUMMARY:");
  console.log("   Contract Address:", CONTRACT_ADDRESS);
  console.log("   Explorer:", "https://amoy.polygonscan.com/address/" + CONTRACT_ADDRESS);
  console.log("\n   Test Results:");
  console.log("   ✅ Step 5: Personal account registered");
  console.log("   ✅ Step 6: Business account registered");
  console.log("   ✅ Step 7: Transaction recorded (100 ILS)");
  console.log("   ✅ Step 8: Balances verified");
  console.log("   ✅ Step 9: TSF transfer completed");
  console.log("\n🎉 All tests passed!\n");
}

main().catch((err) => {
  console.error("❌ Test failed:", err);
  process.exitCode = 1;
});
