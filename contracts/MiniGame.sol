// SPDX-License-Identifier: NONE
pragma solidity 0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";


/**
 *
 * @author Himanshu Singh
*/
contract MiniGame is Ownable {

    struct GameNft {
        uint256 nftId;
        int nftRate;
        string nftName;
        string nftTickerName;
        string nftTeam;
        address nftOwnedBy;
    }

    event Minted(
        uint256 indexed nftId,
        string indexed nftName
    );

    uint256 private nftCount;

    string private winnerOfTheGame = "Game in progress";

    mapping(uint256 => address) private nftOwners;
    mapping(address => uint256) private userBalances;
    mapping(string => bool) private nftTickerNameExists;
    mapping(uint256 => GameNft) private allNfts;

    /**
     *
     * @notice This method returns the owner of particular NFT
     * @return address returns the owner of the NFT
       @param nftId_ ID of the NFT
    */
    function ownerOf(
        uint256 nftId_
    ) public view returns (
        address
    ) {
        address owner = nftOwners[nftId_];
        require(owner != address(0), "Invalid address ( 0x00 )");
        return owner;
    }

    /**
     *
     * @notice This method returns the data of the NFT
     * @return GameNft returns data of the particular NFT
       @param nftId_ ID of the NFT
    */
    function getNftMetaData(
        uint256 nftId_
    ) public view returns (
        GameNft memory
    ) {
        require(doesNftExists(nftId_), "Invalid NFT ID");
        return allNfts[nftId_];
    }

    /**
     *
     * @notice This method returns the total number of NFT's minted
     * @return uint256 returns total NFT's minted
    */
    function getTotalNftsMinted() public view returns (
        uint256
    ) {
        return nftCount;
    }

    /**
     *
     * @notice This method returns the balance of the provided address
     * @return uint256 returns total NFT's owned by the address
       @param owner_ user's wallet address
    */
    function balanceOf(
        address owner_
    ) public view returns (
        uint256
    ) {
        require(owner_ != address(0), "Invalid address ( 0x00 )");
        return userBalances[owner_];
    }

    /**
     *
     * @notice This method returns true if NFT exists else false
     * @return bool returns true or false
       @param nftId_ NFT ID of the NFT
    */
    function doesNftExists(
        uint256 nftId_
    ) public view returns (
        bool
    ) {
        return nftOwners[nftId_] != address(0);
    }

    /**
     *
     * @notice This method returns the winner of the game
     * @return string returns the winner of the contract
    */
    function fetchWinner() external view returns(
        string memory
    ){
        return winnerOfTheGame;
    }

    /**
     *
     * @notice This method mints the new NFT
       @param to_ address of NFT owner
       @param nftId_ token ID of the NFT
    */
    function _mintNft(
        address to_, 
        uint256 nftId_
    ) internal {
        require(nftId_ < 50000, "Cannot mint more than 50000 NFT's");
        userBalances[to_] += 1;
        nftOwners[nftId_] = to_;
    }

    /**
     *
     * @notice This method mints the new NFT for stocks and can be called only by owner of the contract 
       @param nftTickerName_ stock ticker name of the company
       @param nftTeamName_ team name of the NFT stock
       @param nftRate_  rate of the stock in NFT
       @param nftOwnedBy_  owner of the NFT
    */
    function mintGameNft(
        string memory nftTickerName_,
        string memory nftTeamName_,
        int nftRate_,
        address nftOwnedBy_
    ) external onlyOwner {

        require(nftOwnedBy_ != address(0), "Invalid address ( 0x00 )");
        require(
            keccak256(abi.encodePacked((nftTeamName_))) == keccak256(abi.encodePacked(("A"))) ||
            keccak256(abi.encodePacked((nftTeamName_))) == keccak256(abi.encodePacked(("B"))),
            "Invalid team name");

        uint256 nftId = nftCount;

        bytes memory bytesData;
        bytesData = abi.encodePacked(nftTickerName_);
        bytesData = abi.encodePacked(bytesData, "-Play");
        string memory nftName = string(bytesData);

        require(!doesNftExists(nftId), "NFT with this ID already minted");
        require(!nftTickerNameExists[nftTickerName_], "NFT with this ticker name already exists!");

        _mintNft(nftOwnedBy_, nftId);
        nftTickerNameExists[nftTickerName_] = true;

        GameNft memory newNft = GameNft(
            nftId,
            nftRate_ * 100,
            nftName,
            nftTickerName_,
            nftTeamName_,
            nftOwnedBy_
        );

        allNfts[nftId] = newNft;
        nftCount++;

        emit Minted(
            newNft.nftId,
            newNft.nftName
        );
    }

    /**
     *
     * @notice This method stops the game and declares the result
    */
    function stopGameWithResultDeclaration() external onlyOwner {
        int teamAHealth = 0;
        int teamBHealth = 0;
        for(uint256 i = 0; i < nftCount; i++){
            if(keccak256(abi.encodePacked((allNfts[i].nftTeam))) == keccak256(abi.encodePacked(("A")))){
                teamAHealth += allNfts[i].nftRate;
            }else{
                teamBHealth += allNfts[i].nftRate;
            }
        }
        winnerOfTheGame = teamAHealth > teamBHealth ? "A" : 
            (teamBHealth > teamAHealth ? "B" : "Draw");
    }

    /**
     *
     * @notice This method modifies the rate of particular NFT
     * @param nftId_ ID of the NFT
     * @param nftRate_ rate of the NFT
    */
    function updateRateOfNft(
        uint256 nftId_, 
        int nftRate_
    ) external onlyOwner {
        require(doesNftExists(nftId_), "Invalid nft ID");
        GameNft memory nft = getNftMetaData(nftId_);
        nft.nftRate = nftRate_ * 100;
        allNfts[nftId_] = nft;
    }

    /**
     *
     * @notice This method resets the winner of the game
    */
    function resetWinner() external onlyOwner {
        winnerOfTheGame = "Game in progress";
    }

}
