// SPDX-License-Identifier: NONE
pragma solidity 0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";


interface IERC20 {

    function transfer(
        address recipient, 
        uint256 amount
    ) external returns (bool);

}

/**
 *
 * @author Himanshu Singh
*/
contract Oracle is ChainlinkClient, ConfirmedOwner {

    using Chainlink for Chainlink.Request;

    int256 public volume;
    bytes32 private jobId;
    uint256 public fee;

    event RequestVolume(
        bytes32 indexed requestId, 
        int256 volume
    );

    /**
     * @notice Initialize the link token and target oracle
     *
     * Polygon Mumbai Matic Testnet details:
     * Link Token address: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Oracle address: 0x40193c8518BB267228Fc409a613bDbD8eC5a97b3 (Chainlink DevRel)
     * jobId: fcf4140d696d44b687012232948bdd5d
     *
     */
    constructor() ConfirmedOwner(
        msg.sender
    ) {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0x40193c8518BB267228Fc409a613bDbD8eC5a97b3);
        jobId = "fcf4140d696d44b687012232948bdd5d";
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)
    }

    /**
     *
     * @notice This method is used to fetch data from external API's and applicable only for * *
     * integer value
     * @param stockTickerName_ name of the stock ticker
    */
    function requestToCallExternalApi(
        string memory stockTickerName_
    ) public {
        
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfillRequest.selector
        );

        bytes memory bytesData = abi.encodePacked("https://playverseapi.herokuapp.com/pricechange?stock=");
        bytesData = abi.encodePacked(bytesData, stockTickerName_);
        string memory apiUrl = string(bytesData);

        req.add("get", apiUrl);
        req.add("path", "price");
        req.addInt("times", 10**18); // Multiply by times value to remove decimals.
        sendChainlinkRequest(req, (1 * LINK_DIVISIBILITY) / 10); // 0,1*10**18 LINK
    }

    /**
     *
     * @notice This method is used to get the response of external API in the form of int
     * @param requestId_ request id emitted by the request() method for the API call
     * @param volume_ data as a response from the external API call
    */
    function fulfillRequest(
        bytes32 requestId_, 
        int256 volume_
    ) public recordChainlinkFulfillment(
        requestId_
    ) {
        volume = volume_;
    }

    /**
     *
     * @notice This function permits to withdraw the Link tokens from this contract
    */
    function withdrawLinkTokens() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }

}
