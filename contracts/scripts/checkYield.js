const hre = require("hardhat");
const { ethers } = hre;

async function main() {

    const Vault = await ethers.getContractFactory("SolarTokenVault");
    const vault = await Vault.attach(process.env.SOLAR_CONTRACT_ADDRESS);

    // Fetch and display registered users
    const users = await vault.getUsers();
    console.log("Registered users are: ", users);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
