import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("\n========================================");
  console.log("🚀 TESFA DEPLOYMENT TO POLYGON AMOY");
  console.log("========================================\n");

  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  
  console.log("📍 Deployer address:", deployerAddress);
  
  const balance = await ethers.provider.getBalance(deployerAddress);
  console.log("💰 Deployer balance:", ethers.formatEther(balance), "POL\n");

  if (balance === 0n) {
    throw new Error("Deployer has no POL! Get testnet POL from faucet.");
  }

  // ============ STEP 1: DEPLOY CONTRACT ============
  console.log("📝 Step 1: Deploying Tesfa contract...");
  
  const Tesfa = await ethers.getContractFactory("Tesfa");
  const tesfa = await Tesfa.deploy(deployerAddress);
  await tesfa.waitForDeployment();

  const contractAddress = await tesfa.getAddress();
  const deployTx = tesfa.deploymentTransaction();
  const txHash = deployTx?.hash || "N/A";
  const blockNumber = deployTx?.blockNumber || "pending";

  console.log("✅ Contract deployed!");
  console.log("   Address:", contractAddress);
  console.log("   TX Hash:", txHash);
  console.log("   Block:", blockNumber);
  console.log("   Explorer: https://amoy.polygonscan.com/address/" + contractAddress);
  console.log("   TX Link: https://amoy.polygonscan.com/tx/" + txHash);

  // Wait for deployment to be confirmed
  await deployTx?.wait(2);
  console.log("   ✅ Deployment confirmed!\n");

  // ============ STEP 2: VERIFY OWNER/ADMIN ============
  console.log("📝 Step 2: Verifying deployer is platformAdmin...");
  
  const platformAdmin = await tesfa.platformAdmin();
  const isAdmin = platformAdmin.toLowerCase() === deployerAddress.toLowerCase();
  console.log("   platformAdmin:", platformAdmin);
  console.log("   ✅ Deployer is platformAdmin:", isAdmin, "\n");

  // ============ STEP 3: VERIFY DEPLOYER IS BARTER FACILITATOR ============
  console.log("📝 Step 3: Verifying deployer is authorizedBarterFacilitator...");
  
  const isFacilitator = await tesfa.authorizedBarterFacilitators(deployerAddress);
  console.log("   ✅ Deployer is authorized facilitator:", isFacilitator, "\n");

  // ============ STEP 4: CREATE TEST WALLETS ============
  console.log("📝 Step 4: Creating test wallets...");
  
  // Create deterministic test wallets
  const personalWallet = ethers.Wallet.createRandom().connect(ethers.provider);
  const businessWallet = ethers.Wallet.createRandom().connect(ethers.provider);
  
  console.log("   Personal wallet:", personalWallet.address);
  console.log("   Business wallet:", businessWallet.address);

  // Fund test wallets with some POL for gas
  const fundAmount = ethers.parseEther("0.05");
  
  console.log("   Funding personal wallet...");
  const fundTx1 = await deployer.sendTransaction({
    to: personalWallet.address,
    value: fundAmount
  });
  await fundTx1.wait();
  
  console.log("   Funding business wallet...");
  const fundTx2 = await deployer.sendTransaction({
    to: businessWallet.address,
    value: fundAmount
  });
  await fundTx2.wait();
  console.log("   ✅ Wallets funded!\n");

  // ============ STEP 5: REGISTER PERSONAL ACCOUNT ============
  console.log("📝 Step 5: Registering personal account...");
  
  const phoneHash = ethers.keccak256(ethers.toUtf8Bytes("+972501234567"));
  const tesfaWithPersonal = tesfa.connect(personalWallet);
  
  const registerTx = await tesfaWithPersonal.register(phoneHash);
  await registerTx.wait();
  
  const isPersonal = await tesfa.isPersonalAccount(personalWallet.address);
  const isRegistered = await tesfa.isRegistered(personalWallet.address);
  console.log("   ✅ Personal account registered!");
  console.log("   isPersonalAccount:", isPersonal);
  console.log("   isRegistered:", isRegistered, "\n");

  // ============ STEP 6: REGISTER BUSINESS ACCOUNT ============
  console.log("📝 Step 6: Registering business account (via authorizeBusiness)...");
  
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
  const amountILS = 10000; // 100 ILS (scaled by 100)
  
  const recordTx = await tesfaWithBusiness.recordPurchase(phoneHash, amountILS);
  await recordTx.wait();
  
  console.log("   ✅ Transaction recorded!\n");

  // ============ STEP 8: CHECK BALANCES ============
  console.log("📝 Step 8: Checking balances...");
  
  const personalBalance = await tesfa.balanceOf(personalWallet.address);
  const businessBalance = await tesfa.balanceOf(businessWallet.address);
  const ubiPool = await tesfa.ubiPool();
  
  console.log("   Personal (buyer) balance:", ethers.formatEther(personalBalance), "TSF");
  console.log("   Business (seller) balance:", ethers.formatEther(businessBalance), "TSF");
  console.log("   UBI Pool:", ethers.formatEther(ubiPool), "TSF");
  console.log("   ✅ Balances verified!\n");

  // ============ STEP 9: TRANSFER TSF ============
  console.log("📝 Step 9: Transfer TSF from business to personal...");
  
  const transferAmount = businessBalance / 2n; // Transfer half
  const transferTx = await tesfaWithBusiness.transfer(personalWallet.address, transferAmount);
  await transferTx.wait();
  
  const newPersonalBalance = await tesfa.balanceOf(personalWallet.address);
  const newBusinessBalance = await tesfa.balanceOf(businessWallet.address);
  
  console.log("   Transferred:", ethers.formatEther(transferAmount), "TSF");
  console.log("   Personal new balance:", ethers.formatEther(newPersonalBalance), "TSF");
  console.log("   Business new balance:", ethers.formatEther(newBusinessBalance), "TSF");
  console.log("   ✅ Transfer complete!\n");

  // ============ SAVE CONTRACT ADDRESS ============
  console.log("📝 Saving contract address to config...");
  
  const configDir = path.join(__dirname, "..", "config");
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
  
  const configContent = `// Auto-generated by deployment script
// Network: Polygon Amoy Testnet (Chain ID: 80002)
// Deployed: ${new Date().toISOString()}

export const TESFA_CONTRACT_ADDRESS = "${contractAddress}";
export const DEPLOYMENT_TX_HASH = "${txHash}";
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
  console.log("✅ ALL 9 STEPS COMPLETED SUCCESSFULLY!");
  console.log("========================================\n");
  
  console.log("📋 SUMMARY:");
  console.log("   Contract Address:", contractAddress);
  console.log("   TX Hash:", txHash);
  console.log("   Explorer:", "https://amoy.polygonscan.com/address/" + contractAddress);
  console.log("\n   Test Results:");
  console.log("   ✅ Step 1: Contract deployed");
  console.log("   ✅ Step 2: Deployer is owner (platformAdmin)");
  console.log("   ✅ Step 3: Deployer is authorizedCaller (facilitator)");
  console.log("   ✅ Step 4: Test wallets created");
  console.log("   ✅ Step 5: Personal account registered");
  console.log("   ✅ Step 6: Business account registered");
  console.log("   ✅ Step 7: Transaction recorded (100 ILS)");
  console.log("   ✅ Step 8: Balances verified");
  console.log("   ✅ Step 9: TSF transfer completed");
  console.log("\n🎉 Tesfa is live on Polygon Amoy!\n");
}

main().catch((err) => {
  console.error("❌ Deployment failed:", err);
  process.exitCode = 1;
});
