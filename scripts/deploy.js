const hre = require("hardhat");

async function main() {
  const LadderContract = await hre.ethers.getContractFactory("Ladder");
  const ladderContract = await LadderContract.deploy();

  await ladderContract.deployed();

  console.log(`Contract deployed to ${ladderContract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
