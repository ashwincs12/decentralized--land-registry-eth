require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */

const HOLESKY_URL = process.env.HOLESKY_URL;
const PRIVATE_URL = process.env.PRIVATE_KEY;

module.exports = {
    solidity: "0.8.24", // Set the Solidity version you are using
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545"
        },
        holesky:{
            url:HOLESKY_URL,
            accounts:[PRIVATE_URL]
        } 
    }
};
