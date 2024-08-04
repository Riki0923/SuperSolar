require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.24",
  networks: {
    //Add extra chains as needed 
    hardhat: {
      chainId: 11155111,
    },
    baseSepolia: {
      url: `${process.env.ALCHEMY_BASE_SEPOLIA_URL}`,
      accounts: [`0x${process.env.PRIVATE_KEY_METAMASK0}`
      ],
    },
  },
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: "GCTVJFZFESQ8RSGU6VDKDCG8Q4DGSQK3Q1"
  },
  // sourcify: {
  //   enabled: true
  // }
};