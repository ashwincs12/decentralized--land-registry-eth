const hre = require("hardhat");

async function main() {
  const land = await hre.ethers.deployContract("LandSale");

  await land.waitForDeployment();

  console.log(
    `Contract deployed to ${land.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

