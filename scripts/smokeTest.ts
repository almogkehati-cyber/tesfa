import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0x7297429B9560f899F4c4ee3Dc443D99d6fcb53Bf";

async function main() {
  const [deployer] = await ethers.getSigners();
  const tesfa = await ethers.getContractAt("Tesfa", CONTRACT_ADDRESS);

  console.log("=== TSF On-Chain Smoke Tests ===\n");

  // 1. Basic info
  const name = await tesfa.name();
  const symbol = await tesfa.symbol();
  const totalSupply = await tesfa.totalSupply();
  const maxSupply = await tesfa.MAX_SUPPLY();
  
  console.log("Token Name:", name);
  console.log("Symbol:", symbol);
  console.log("Total Supply:", ethers.formatEther(totalSupply), "TSF");
  console.log("Max Supply:", ethers.formatEther(maxSupply), "TSF");

  // 2. Register deployer
  const isRegistered = await tesfa.isRegistered(deployer.address);
  if (!isRegistered) {
    console.log("\nRegistering deployer...");
    const tx = await tesfa.register();
    await tx.wait();
    console.log("✓ Registered:", deployer.address);
  } else {
    console.log("\n✓ Already registered:", deployer.address);
  }

  // 3. Check UBI pool
  const ubiPool = await tesfa.ubiPool();
  console.log("\nUBI Pool:", ethers.formatEther(ubiPool), "TSF");

  // 4. Check deployer balance
  const balance = await tesfa.balanceOf(deployer.address);
  console.log("Deployer Balance:", ethers.formatEther(balance), "TSF");

  // 5. Check constants
  const taxRate = await tesfa.TAX_RATE();
  const baseRate = await tesfa.BASE_RATE();
  console.log("\nTax Rate:", taxRate.toString(), "bps (", Number(taxRate) / 100, "%)");
  console.log("Base Rate:", baseRate.toString(), "TSF per 100 ILS");

  console.log("\n=== Smoke Tests Passed ✓ ===");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
