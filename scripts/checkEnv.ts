import { ethers } from "hardhat";

async function main() {
  console.log("Checking environment...");
  console.log("AMOY_RPC_URL set:", !!process.env.AMOY_RPC_URL);
  console.log("PRIVATE_KEY set:", !!process.env.PRIVATE_KEY);
  console.log("PRIVATE_KEY length:", process.env.PRIVATE_KEY?.length || 0);
  
  const signers = await ethers.getSigners();
  console.log("Number of signers:", signers.length);
  
  if (signers.length > 0) {
    const address = await signers[0].getAddress();
    console.log("Deployer address:", address);
    
    const balance = await ethers.provider.getBalance(address);
    console.log("Balance:", ethers.formatEther(balance), "POL");
  } else {
    console.log("NO SIGNERS - PRIVATE_KEY is missing or invalid!");
  }
}

main().catch(console.error);
