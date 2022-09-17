# Mini Game

## Description:
 
Mini Game is a NFT based game which consists of 2 teams A and B. Each team contains 5 members (NFT) which holds the stock market profit/loss rate in the NFT data. Based on the sum of profit/loss rate of each NFT , at last sum of all NFT's rate of each team winner is decided. All the rates (Profit/Loss) is gathers from external API's via Oracle smart contract.

### Important Points :

- Only contract owner is allowed to mint new NFT's and declare winner
- Only contract owner is allowed to call oracle to fetch data from external API's
- Blockchain used is Mumbai Matic testnet
- Oracle contract charges 0.1 LINK token on each API request
- Winner is decided based on sum of rates of each member of the team

### Techologies Used:

- Solidity
- Hardhat

### List of Libraries/Framework used:

- Openzepplin
- Chainlink
- BigNumber
- Ethers

### Directory layout
       
├── contracts                    
├── docs                    
├── scripts                             
└── README.md

### Documents

Mini Game Documentation :  [Link](https://mylink.pdf)

### How to install and run :

- Run `npm install` to install all dependencies

- Run `npx hardhat compile` to compile all the contracts

- Run `npx hardhat run scripts/script.js --network matic` to deploy all the contracts and fetch result
