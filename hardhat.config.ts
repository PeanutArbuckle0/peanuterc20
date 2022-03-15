import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require("@nomiclabs/hardhat-waffle");

 // Go to https://www.alchemyapi.io, sign up, create
 // a new App in its dashboard, and replace "KEY" with its key
 const ALCHEMY_API_KEY = "680a92771a174278a1aadb9c9d736e1e";
 
 // Replace this private key with your Ropsten account private key
 // To export your private key from Metamask, open Metamask and
 // go to Account Details > Export Private Key
 // Be aware of NEVER putting real Ether into testing accounts
 const GOERLI_PRIVATE_KEY = "7d5ddb12ecd91234b37cecd971b6c577a93cdb446ad9d643b884ef4bb6cf3b6f";
 
 export default {
   solidity: "0.8.0",
   networks: {
     goerli: {
       url: `https://goerli.infura.io/v3/${ALCHEMY_API_KEY}`,
       accounts: [`${GOERLI_PRIVATE_KEY}`]
     }
   }
 };