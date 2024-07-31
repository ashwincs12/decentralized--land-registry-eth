# Decentralized Land Registry

## NOTE
This web application runs on Ethereum Holesky Network. Make sure you have an Metamask extension installed and set the network to Holesky Testnet to avaid unexpected errors.

## Introduction
A decentralized land registry web application where sellers can register their land, buyers place bids for a corresponding land and sale is done to the highest bidder along with the exchange of a ERC 721 token of ownership.

## Features
- **Land Registration:** Sellers can register their land asset on the portal by giving all the details. As soon as the land gets registered an ERC 721 token of ownership is transferred to the owner's address, indicating ownership of the land.
- **Bidding System:** Interested buyers can place orders by staking an amount which is greater than the base price or the highest bid(if existing bids are present). Multiple bid placing by the same buyer is supported and the total bid amount for a buyer is considered as the sum of all the bid amounts placed by them.
- **Auction:** The buying process is done by an auction where the highest bid is transferred to the owner of the land asset and all the other bid amounts are transferred back to the bidders account thus maintaining transparency and trust.
- **Token Exchange:** A **Non-Fungible Token (NFT)** is transferred during the exchange of land assets which denotes ownership of assets.

  ## Technology Stack
- **React.js:** Frontend Development
- **Solidity:** Language used to program Smart Contract. Remix IDE was used for convenience in compilation and testing.
- **Hardhat:** Used for deploying smart contract on testnet.
- **Ethers.js:** Used for integrating smart contract with frontend.
- **Ethereum Holesky:** Testnet on which the application is deployed. Native currency is ETH.
- **OpenZepallin:** ERC 721 token minting fucnction is imported from OpenZepallin.

## Installation
Follow these steps to set up the project locally:

1. **Clone the Repository**
   ```sh
   git clone https://github.com/ashwincs12/decentralized-land-registry
   ```
2. **Install Dependencies**
   ```sh
   npm install
   cd client
   npm install
   ```
3. **Configure Blockchain Network**
   - Use Alchemy/Infura to generate API Keys
   - Replace <API KEY> and <PRIVATE KEY> fields in configuration file.
     
   ```sh
    networks: {
      holesky: {
        url: <API KEY>, 
        accounts: [<PRIVATE KEY>] 
      }
   ```
4. **Deploy Smart Contract**
   ```sh
   npx hardhat run scripts/deploy.js --network holesky
   ```
5. **Start the Application**
   ```sh
   npm start
   ```

## Project Structure

- **contracts/**: Smart contracts written in Solidity.
- **scripts/**: Deployment scripts.
- **client/**: Frontend application using React.

## Acknowledgments

- This project was done as part of Certified Ethereum Developer Course (CED) by **Kerala Blockchain Academy (KBA)**
