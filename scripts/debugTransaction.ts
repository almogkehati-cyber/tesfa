import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0x7297429B9560f899F4c4ee3Dc443D99d6fcb53Bf";

async function main() {
  const [deployer, user2] = await ethers.getSigners();
  const tesfa = await ethers.getContractAt("Tesfa", CONTRACT_ADDRESS) as any;

  console.log("=== Debug recordTransaction ===\n");
  console.log("Deployer:", deployer.address);
  
  // Check registration status
  const isReg1 = await tesfa.isRegistered(deployer.address);
  console.log("Deployer registered:", isReg1);

  // Try to get a second signer or use deployer as both
  let buyer = deployer.address;
  let seller = deployer.address;
  
  if (user2) {
    console.log("User2:", user2.address);
    const isReg2 = await tesfa.isRegistered(user2.address);
    console.log("User2 registered:", isReg2);
    
    if (!isReg2) {
      console.log("\nRegistering user2...");
      try {
        const tx = await tesfa.connect(user2).register();
        await tx.wait();
        console.log("✓ User2 registered");
        seller = user2.address;
      } catch (e: any) {
        console.log("Failed to register user2:", e.reason || e.message);
      }
    } else {
      seller = user2.address;
    }
  }

  // Try recordTransaction
  console.log("\n--- Attempting recordTransaction ---");
  console.log("Buyer:", buyer);
  console.log("Seller:", seller);
  console.log("Amount: 1000 ILS");

  try {
    const tx = await tesfa.recordTransaction(buyer, seller, 1000);
    console.log("TX sent:", tx.hash);
    const receipt = await tx.wait();
    console.log("✓ Success! Gas used:", receipt?.gasUsed.toString());
    
    const balance = await tesfa.balanceOf(buyer);
    console.log("Buyer balance after:", ethers.formatEther(balance), "TSF");
  } catch (e: any) {
    console.log("\n❌ REVERT ERROR:");
    console.log("Reason:", e.reason || "unknown");
    console.log("Message:", e.message);
    if (e.data) console.log("Data:", e.data);
  }
}

main().catch(console.error);
