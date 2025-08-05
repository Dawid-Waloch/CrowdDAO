import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

export default {
  solidity: "0.8.28",
  paths: {
    sources: "./ethereum/contracts",
    ignition: "./ethereum/ignition"
  },
  networks: {
    url: process.env.SEPOLIA_RPC,
    accounts: [process.env.PRIVATE_KEY]
  }
};
