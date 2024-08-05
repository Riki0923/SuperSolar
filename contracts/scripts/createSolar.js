const hre = require("hardhat")
const { ethers } = hre


async function main () {


    const Solar = await ethers.getContractFactory("Solar");
    const solar = await Solar.attach(process.env.SOLAR_CONTRACT_ADDRESS);

    
    const interact = await solar.createSolar();
    console.log("Interaction successfull")

    const getSolar = await solar.getSolar();
    console.log("solarNumber is:", getSolar);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });