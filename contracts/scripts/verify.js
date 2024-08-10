const hre = require("hardhat");
const { ethers } = hre;

async function main() {
    // Load environment variables for private keys and contract address
    const { PRIVATE_KEY_METAMASK0, SOLAR_CONTRACT_ADDRESS } = process.env;

    // Connect to the Solar contract
    const Solar = await ethers.getContractFactory("Solar");
    const solar = await Solar.attach(SOLAR_CONTRACT_ADDRESS);

    // Create wallet instance for the owner account
    const ownerWallet = new ethers.Wallet(PRIVATE_KEY_METAMASK0, ethers.provider);

    // Define the solar IDs to be verified
    const solarId1 = 0; // ID for the first user
    const solarId2 = 1; // ID for the second user

    // Verify user 1
    console.log("Verifying User 1...");
    let tx = await solar.connect(ownerWallet).verify(solarId1);
    console.log("Transaction Hash:", tx.hash);
    await tx.wait();
    console.log("User 1 verification completed!");

    // Verify user 2
    console.log("Verifying User 2...");
    tx = await solar.connect(ownerWallet).verify(solarId2);
    console.log("Transaction Hash:", tx.hash);
    await tx.wait();
    console.log("User 2 verification completed!");

    // Fetch and display registered users
    const users = await solar.getUsers();
    console.log("Registered users are:", users);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
