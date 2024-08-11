const hre = require("hardhat");
const { ethers } = hre;

async function main() {
    // Load environment variables for private keys and contract address
    const { PRIVATE_KEY_METAMASK0, PRIVATE_KEY_METAMASK1, SOLAR_CONTRACT_ADDRESS } = process.env;

    // Connect to the Solar contract
    const Solar = await ethers.getContractFactory("Solar");
    const solar = await Solar.attach(SOLAR_CONTRACT_ADDRESS);

    // Create wallet instances for different accounts
    const sellerWallet = new ethers.Wallet(PRIVATE_KEY_METAMASK0, ethers.provider);
    const buyerWallet = new ethers.Wallet(PRIVATE_KEY_METAMASK1, ethers.provider);

    // Define the amount and price for selling energy
    const amount = 1; // 3 kWh
    const price = ethers.parseUnits("0.001", "ether"); // 0.001 Ether

    // Check seller balance before the transaction
    let sellerBalanceBefore = await ethers.provider.getBalance(sellerWallet.address);
    console.log(`Seller Balance Before Sale: ${ethers.formatEther(sellerBalanceBefore)} ETH`);

    // Perform the sell operation
    console.log("Selling energy...");
    let tx = await solar.connect(sellerWallet).sellEnergy(amount, price);
    console.log("Sell Transaction Hash:", tx.hash);
    await tx.wait();
    console.log("Energy sale completed!");

    // Fetch the solar energy transactions
    console.log("Fetching solar energy transactions...");
    const solarEnergies = await solar.getSolarEnergies();
    console.log("Solar Energy Transactions:", solarEnergies);

    // Determine the last energy transaction ID (assuming it's an index)
    const energyTxId = solarEnergies.length - 1;

    // Perform the buy operation
    // console.log("Buying energy...");
    // tx = await solar.connect(buyerWallet).buyEnergy(energyTxId, { value: price });
    // console.log("Buy Transaction Hash:", tx.hash);
    // await tx.wait();
    // console.log("Energy purchase completed!");

    // // Check seller balance after the transaction
    // let sellerBalanceAfter = await ethers.provider.getBalance(sellerWallet.address);
    // console.log(`Seller Balance After Sale: ${ethers.formatEther(sellerBalanceAfter)} ETH`);

    // Fetch SolarEnergies after purchase is done
    const solarEnergiesAfterBuy = await solar.getSolarEnergies();
    console.log("Solar Energy Transactions asófter purchase:", solarEnergiesAfterBuy);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});