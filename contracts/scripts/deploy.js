const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Solar = await hre.ethers.getContractFactory("Solar");
  const solar = await Solar.deploy(deployer);

  console.log("Solar deployed to:", solar.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });