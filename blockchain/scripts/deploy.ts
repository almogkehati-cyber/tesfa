import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  // Deploy Tesfa contract
  const Tesfa = await ethers.getContractFactory("Tesfa");
  const tesfa = await Tesfa.deploy();
  await tesfa.waitForDeployment();

  const tesfaAddress = await tesfa.getAddress();
  console.log("Tesfa deployed to:", tesfaAddress);

  // Setup initial authorized callers (deployer is already owner)
  console.log("\n--- Initial Setup ---");
  
  // Verify deployment
  const name = await tesfa.name();
  const symbol = await tesfa.symbol();
  const maxSupply = await tesfa.MAX_SUPPLY();
  const currentRate = await tesfa.getCurrentRate();

  console.log("Token Name:", name);
  console.log("Token Symbol:", symbol);
  console.log("Max Supply:", ethers.formatEther(maxSupply), "TSF");
  console.log("Current Rate:", ethers.formatEther(currentRate));
  console.log("\n--- Deployment Complete ---");

  return { tesfa, tesfaAddress };
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
