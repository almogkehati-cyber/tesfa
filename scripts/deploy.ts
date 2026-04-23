import { ethers, run } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const platformAddress = process.env.PLATFORM_ADDRESS || deployer.address;
  
  console.log("Deploying with platform address:", platformAddress);
  
  const Tesfa = await ethers.getContractFactory("Tesfa");
  const tesfa = await Tesfa.deploy(platformAddress);
  await tesfa.waitForDeployment();

  const address = await tesfa.getAddress();
  console.log("Tesfa deployed to:", address);

  const shouldVerify = process.env.VERIFY === "true";
  if (shouldVerify) {
    await tesfa.deploymentTransaction()?.wait(5);
    await run("verify:verify", {
      address,
      constructorArguments: [],
    });
    console.log("Verified:", address);
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
