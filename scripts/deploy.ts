import { ethers } from "hardhat";

async function main() {
  const CONTRACT_NAME = "ETHr";
  const DeployContract = await ethers.getContractFactory(CONTRACT_NAME);
  const deployContract = await DeployContract.deploy("ETHr", "ETHr");
  await deployContract.deployed();
  console.log(CONTRACT_NAME, " deployed to:", deployContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
