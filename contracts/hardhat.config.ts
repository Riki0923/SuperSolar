import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";

const PRIVATE_KEY = process.env.PRIVATE_KEY_METAMASK0 || "1cbd3cf2dcf13b0c0dfdf13d1069475cb10cd4fff495a1c67a104f3e4f8e4ef1";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    "base-Sepolia": {
      url: 'https://base-sepolia.blockpi.network/v1/rpc/public',  // RPC URL for Base Sepolia
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      // Any non-empty string can be used for Base Sepolia
      baseSepolia: "f96ae322-4ab3-490b-b7a2-fdf5d09ec8c2"
    },
    customChains: [
      {
        network: "base-Sepolia",
        chainId: 84531, // Base Sepolia chain ID
        urls: {
          apiURL: "https://base-sepolia.blockscout.com/api",
          browserURL: "https://base-sepolia.blockscout.com/",
        }
      }
    ]
  },
  sourcify: {
    enabled: false
  }
};

export default config;
