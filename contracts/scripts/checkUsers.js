const hre = require("hardhat");
const { ethers } = hre;

async function main() {

    const Solar = await ethers.getContractFactory("Solar");
    const solar = await Solar.attach(process.env.SOLAR_CONTRACT_ADDRESS);

    // Fetch and display registered users
    const users = await solar.getUsers();
    console.log("Registered users are: ", users);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
