const hre = require("hardhat");
const { ethers } = hre;

async function main() {
    // Load environment variables for private keys and contract address
    const { PRIVATE_KEY_METAMASK0, PRIVATE_KEY_METAMASK1, SOLAR_CONTRACT_ADDRESS } = process.env;

    // Connect to the Solar contract
    const Solar = await ethers.getContractFactory("Solar");
    const solar = await Solar.attach(SOLAR_CONTRACT_ADDRESS);

    // Create wallet instances for different accounts
    const wallet0 = new ethers.Wallet(PRIVATE_KEY_METAMASK0, ethers.provider);
    const wallet1 = new ethers.Wallet(PRIVATE_KEY_METAMASK1, ethers.provider);

    // Define registration parameters for account 0 (Seller)
    const fullName0 = "Vitalik Buterin";
    const email0 = "Vitalik@solarEnergy.com";
    const country0 = "USA";
    const userRole0 = 0; // Seller
    const solarCapacity0 = 3; // Example capacity in kWh
    const gridStatus0 = 1; // ConnectedWithPermission

    // Define registration parameters for account 1 (Buyer)
    const fullName1 = "Krisztian Barta";
    const email1 = "mudipoker@gmail.com";
    const country1 = "Germany";
    const userRole1 = 1; // Buyer
    const solarCapacity1 = 0; // Not needed for Buyer
    const gridStatus1 = 0; // Not needed for Buyer

    // Perform registration with account 0
    console.log("Registering Seller...");
    let tx = await solar.connect(wallet0).register(
        fullName0,
        email0,
        country0,
        // userRole0,
        solarCapacity0,
        gridStatus0
    );

    console.log("Transaction Hash:", tx.hash);
    await tx.wait();
    console.log("Seller registration completed!");

    // Perform registration with account 1
    console.log("Registering Buyer...");
    tx = await solar.connect(wallet1).register(
        fullName1,
        email1,
        country1,
        // userRole1,
        solarCapacity1,
        gridStatus1
    );

    console.log("Transaction Hash:", tx.hash);
    await tx.wait();
    console.log("Buyer registration completed!");

    // Fetch and display registered users
    const users = await solar.getUsers();
    console.log("Registered users are: ", users);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
