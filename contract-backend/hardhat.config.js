require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const GoerliAccountKey = process.env.GOERLI_PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  forking: {
    url: "https://eth-goerli.g.alchemy.com/v2/042IgtoSu65t9_V70-a0lCIlfxzAeW2c",
  },
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/042IgtoSu65t9_V70-a0lCIlfxzAeW2c",
      accounts: [GoerliAccountKey],
    },
    hhLocal: {
      url: "http://localhost:8545"
    },
  },
};
