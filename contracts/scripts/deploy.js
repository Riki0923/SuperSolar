const { ethers } = require("hardhat");

async function main() {
  const [deployer, user1] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy the Vault contract
  const Vault = await ethers.getContractFactory("SolarTokenVault");
  const vault = await Vault.deploy(deployer); // No constructor parameters needed now
  console.log("Vault deployed to:", vault.target);

  // Deploy the Solar contract
  const Solar = await ethers.getContractFactory("Solar");
  const solar = await Solar.deploy(deployer, vault.target); // Pass the deployer and vault address

  console.log("Solar deployed to:", solar.target);

  // Check initial balance of deployer
  const deployerBalance = await vault.balanceOf(deployer.address);
  console.log(`Deployer initial balance: ${ethers.formatUnits(deployerBalance, 18)} tokens`);

  // Transfer tokens from deployer to user1
  const transferAmount = ethers.parseUnits('1000', 18); // 1000 tokens with 18 decimals
  console.log(`Transferring ${ethers.formatUnits(transferAmount, 18)} tokens from deployer to user1`);
  await vault.transfer(user1.address, transferAmount);

  // Check balances after transfer
  const user1Balance = await vault.balanceOf(user1.address);
  console.log(`User1 balance after transfer: ${ethers.formatUnits(user1Balance, 18)} tokens`);

  const deployerBalanceAfter = await vault.balanceOf(deployer.address);
  console.log(`Deployer balance after transfer: ${ethers.formatUnits(deployerBalanceAfter, 18)} tokens`);

  console.log("Token transfer completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
