const hre = require("hardhat");
const { BigNumber } = require("ethers");

async function mainMethod() {

    let rate;
    const decimals = "1000000000000000000";
    const linkTokenAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";

    [deployerAccount,] = await ethers.getSigners();
    console.log(`Account used for calling contract functions : ${deployerAccount.address}`);
    console.log("********************************************************************************");

    linkToken = await hre.ethers.getContractAt("IERC20", linkTokenAddress);
    console.log("Link Token contract :", linkTokenAddress);
    console.log("********************************************************************************");

    const Oracle = await hre.ethers.getContractFactory("Oracle");
    const oracle = await Oracle.deploy();
    await oracle.deployed();
    console.log("Oracle contract deployed to :", oracle.address);
    console.log("********************************************************************************");

    const MiniGame = await hre.ethers.getContractFactory("MiniGame");
    const miniGame = await MiniGame.deploy();
    await miniGame.deployed();
    console.log("MiniGame contract deployed to :", miniGame.address);
    console.log("********************************************************************************");

    const transferResult = await linkToken.transfer(oracle.address, "2000000000000000000");
    await transferResult.wait();
    console.log("Transferred 2 Link Token to Oracle contract");
    console.log("********************************************************************************");

    const cscoNftMinted = await miniGame.mintGameNft(
        "CSCO",
        "A",
        "0",
        deployerAccount.address
    );
    await cscoNftMinted.wait();

    const fetchedCscoNftData = await miniGame.getNftMetaData(0);
    console.log("CSCO NFT minted data : ");
    console.log(fetchedCscoNftData);
    console.log("********************************************************************************");

    const tcsNftMinted = await miniGame.mintGameNft(
        "TCS",
        "A",
        "0",
        deployerAccount.address
    );
    await tcsNftMinted.wait();

    const fetchedTcsNftData = await miniGame.getNftMetaData(1);
    console.log("TCS NFT minted data : ");
    console.log(fetchedTcsNftData);
    console.log("********************************************************************************");

    const relianceNftMinted = await miniGame.mintGameNft(
        "RELIANCE",
        "A",
        "0",
        deployerAccount.address
    );
    await relianceNftMinted.wait();

    const fetchedRelianceNftData = await miniGame.getNftMetaData(2);
    console.log("RELIANCE NFT minted data : ");
    console.log(fetchedRelianceNftData);
    console.log("********************************************************************************");

    const saudiNftMinted = await miniGame.mintGameNft(
        "2222",
        "A",
        "0",
        deployerAccount.address
    );
    await saudiNftMinted.wait();

    const fetchedSaudiNftData = await miniGame.getNftMetaData(3);
    console.log("SAUDI NFT minted data : ");
    console.log(fetchedSaudiNftData);
    console.log("********************************************************************************");

    const chinaNftMinted = await miniGame.mintGameNft(
        "002630",
        "A",
        "0",
        deployerAccount.address
    );
    await chinaNftMinted.wait();

    const fetchedChinaNftData = await miniGame.getNftMetaData(4);
    console.log("CHINA NFT minted data : ");
    console.log(fetchedChinaNftData);
    console.log("********************************************************************************");

    const brazilNftMinted = await miniGame.mintGameNft(
        "BBAS3",
        "B",
        "0",
        deployerAccount.address
    );
    await brazilNftMinted.wait();

    const fetchedBrazilNftData = await miniGame.getNftMetaData(5);
    console.log("BRAZIL NFT minted data : ");
    console.log(fetchedBrazilNftData);
    console.log("********************************************************************************");

    const balfourNftMinted = await miniGame.mintGameNft(
        "BBY",
        "B",
        "0",
        deployerAccount.address
    );
    await balfourNftMinted.wait();

    const fetchedBalfourNftData = await miniGame.getNftMetaData(6);
    console.log("BALFOUR NFT minted data : ");
    console.log(fetchedBalfourNftData);
    console.log("********************************************************************************");

    const zomatoNftMinted = await miniGame.mintGameNft(
        "ZOMATO",
        "B",
        "0",
        deployerAccount.address
    );
    await zomatoNftMinted.wait();

    const fetchedZomatoNftData = await miniGame.getNftMetaData(7);
    console.log("ZOMATO NFT minted data : ");
    console.log(fetchedZomatoNftData);
    console.log("********************************************************************************");

    const jiangsuNftMinted = await miniGame.mintGameNft(
        "002471",
        "B",
        "0",
        deployerAccount.address
    );
    await jiangsuNftMinted.wait();

    const fetchedJiangsuNftData = await miniGame.getNftMetaData(8);
    console.log("JIANGSU NFT minted data : ");
    console.log(fetchedJiangsuNftData);
    console.log("********************************************************************************");

    const toyotaNftMinted = await miniGame.mintGameNft(
        "TM",
        "B",
        "0",
        deployerAccount.address
    );
    await toyotaNftMinted.wait();

    const fetchedToyotaNftData = await miniGame.getNftMetaData(9);
    console.log("TOYOTA NFT minted data : ");
    console.log(fetchedToyotaNftData)
    console.log("********************************************************************************");

    console.log("Waiting for 3 minutes, after that we will fetch new rate's of all the tickers");
    console.log("********************************************************************************");
    rate = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            resolve(null);
        }, 180000);
    });
    console.log("Waiting time for 3 minutes finished , now fetch fresh rate's of the tickers");
    console.log("********************************************************************************");

    const updateCscoApiCall = await oracle.requestToCallExternalApi("CSCO");
    await updateCscoApiCall.wait();
    console.log("Called Oracle to fetch rate(profit/loss) of CSCO ticker");
    console.log("********************************************************************************");

    rate = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await oracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Profit/Loss rate fetched for CSCO ticker : ", (BigNumber.from(rate).div(BigNumber.from(decimals))).toString());
    console.log("********************************************************************************");

    const cscoResult = await miniGame.updateRateOfNft(0, rate);
    await cscoResult.wait();

    const updatedCscoNftData = await miniGame.getNftMetaData(0);
    console.log("Updated profit/loss rate in CSCO NFT data : ");
    console.log(updatedCscoNftData);
    console.log("********************************************************************************");

    const updateTcsApiCall = await oracle.requestToCallExternalApi("TCS");
    await updateTcsApiCall.wait();
    console.log("Called Oracle to fetch rate(profit/loss) of TCS ticker");
    console.log("********************************************************************************");

    rate = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await oracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Profit/Loss rate fetched for TCS ticker : ", (BigNumber.from(rate).div(BigNumber.from(decimals))).toString());
    console.log("********************************************************************************");

    const tcsResult = await miniGame.updateRateOfNft(1, rate);
    await tcsResult.wait();

    const updatedTcsNftData = await miniGame.getNftMetaData(1);
    console.log("Updated profit/loss rate in TCS NFT data : ");
    console.log(updatedTcsNftData);
    console.log("********************************************************************************");

    const updateRelianceApiCall = await oracle.requestToCallExternalApi("RELIANCE");
    await updateRelianceApiCall.wait();
    console.log("Called Oracle to fetch rate(profit/loss) of RELIANCE ticker");
    console.log("********************************************************************************");

    rate = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await oracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Profit/Loss rate fetched for RELIANCE ticker : ", (BigNumber.from(rate).div(BigNumber.from(decimals))).toString());
    console.log("********************************************************************************");

    const relianceResult = await miniGame.updateRateOfNft(2, rate);
    await relianceResult.wait();

    const updatedRelianceNftData = await miniGame.getNftMetaData(2);
    console.log("Updated profit/loss rate in RELIANCE NFT data : ");
    console.log(updatedRelianceNftData);
    console.log("********************************************************************************");

    const updateSaudiApiCall = await oracle.requestToCallExternalApi("2222");
    await updateSaudiApiCall.wait();
    console.log("Called Oracle to fetch rate(profit/loss) of SAUDI ticker");
    console.log("********************************************************************************");

    rate = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await oracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Profit/Loss rate fetched for SAUDI ticker : ", (BigNumber.from(rate).div(BigNumber.from(decimals))).toString());
    console.log("********************************************************************************");

    const saudiResult = await miniGame.updateRateOfNft(3, rate);
    await saudiResult.wait();

    const updatedSaudiNftData = await miniGame.getNftMetaData(3);
    console.log("Updated profit/loss rate in SAUDI NFT data : ");
    console.log(updatedSaudiNftData);
    console.log("********************************************************************************");

    const updateChinaApiCall = await oracle.requestToCallExternalApi("002630");
    await updateChinaApiCall.wait();
    console.log("Called Oracle to fetch rate(profit/loss) of CHINA ticker");
    console.log("********************************************************************************");

    rate = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await oracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Profit/Loss rate fetched for CHINA ticker : ", (BigNumber.from(rate).div(BigNumber.from(decimals))).toString());
    console.log("********************************************************************************");

    const chinaResult = await miniGame.updateRateOfNft(4, rate);
    await chinaResult.wait();

    const updatedChinaNftData = await miniGame.getNftMetaData(4);
    console.log("Updated profit/loss rate in CHINA NFT data : ");
    console.log(updatedChinaNftData);
    console.log("********************************************************************************");

    const updateBrazilApiCall = await oracle.requestToCallExternalApi("BBAS3");
    await updateBrazilApiCall.wait();
    console.log("Called Oracle to fetch rate(profit/loss) of BRAZIL ticker");
    console.log("********************************************************************************");

    rate = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await oracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Profit/Loss rate fetched for BRAZIL ticker : ", (BigNumber.from(rate).div(BigNumber.from(decimals))).toString());
    console.log("********************************************************************************");

    const brazilResult = await miniGame.updateRateOfNft(5, rate);
    await brazilResult.wait();

    const updatedBrazilNftData = await miniGame.getNftMetaData(5);
    console.log("Updated profit/loss rate in BRAZIL NFT data : ");
    console.log(updatedBrazilNftData);
    console.log("********************************************************************************");

    const updateBalfourApiCall = await oracle.requestToCallExternalApi("BBY");
    await updateBalfourApiCall.wait();
    console.log("Called Oracle to fetch rate(profit/loss) of BALFOUR ticker");
    console.log("********************************************************************************");

    rate = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await oracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Profit/Loss rate fetched for BALFOUR ticker : ", (BigNumber.from(rate).div(BigNumber.from(decimals))).toString());
    console.log("********************************************************************************");

    const balfourResult = await miniGame.updateRateOfNft(6, rate);
    await balfourResult.wait();

    const updatedBalfourNftData = await miniGame.getNftMetaData(6);
    console.log("Updated profit/loss rate in BALFOUR NFT data : ");
    console.log(updatedBalfourNftData);
    console.log("********************************************************************************");

    const updateZomatoApiCall = await oracle.requestToCallExternalApi("ZOMATO");
    await updateZomatoApiCall.wait();
    console.log("Called Oracle to fetch rate(profit/loss) of ZOMATO ticker");
    console.log("********************************************************************************");

    rate = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await oracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Profit/Loss rate fetched for ZOMATO ticker : ", (BigNumber.from(rate).div(BigNumber.from(decimals))).toString());
    console.log("********************************************************************************");

    const zomatoResult = await miniGame.updateRateOfNft(7, rate);
    await zomatoResult.wait();

    const updatedZomatoNftData = await miniGame.getNftMetaData(7);
    console.log("Updated profit/loss rate in ZOMATO NFT data : ");
    console.log(updatedZomatoNftData);
    console.log("********************************************************************************");

    const updateJiangsuApiCall = await oracle.requestToCallExternalApi("002471");
    await updateJiangsuApiCall.wait();
    console.log("Called Oracle to fetch rate(profit/loss) of JIANGSU ticker");
    console.log("********************************************************************************");

    rate = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await oracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Profit/Loss rate fetched for JIANGSU ticker : ", (BigNumber.from(rate).div(BigNumber.from(decimals))).toString());
    console.log("********************************************************************************");

    const jiangsuResult = await miniGame.updateRateOfNft(8, rate);
    await jiangsuResult.wait();

    const updatedJiangsuNftData = await miniGame.getNftMetaData(8);
    console.log("Updated profit/loss rate in JIANGSU NFT data : ");
    console.log(updatedJiangsuNftData);
    console.log("********************************************************************************");

    const updateToyotaApiCall = await oracle.requestToCallExternalApi("TM");
    await updateToyotaApiCall.wait();
    console.log("Called Oracle to fetch rate(profit/loss) of TOYOTA ticker");
    console.log("********************************************************************************");

    rate = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await oracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Profit/Loss rate fetched for TOYOTA ticker : ", (BigNumber.from(rate).div(BigNumber.from(decimals))).toString());
    console.log("********************************************************************************");

    const toyotaResult = await miniGame.updateRateOfNft(9, rate);
    await toyotaResult.wait();

    const updatedToyotaNftData = await miniGame.getNftMetaData(9);
    console.log("Updated profit/loss rate in TOYOTA NFT data : ");
    console.log(updatedToyotaNftData);
    console.log("********************************************************************************");

    const declaration = await miniGame.stopGameWithResultDeclaration();
    await declaration.wait();
    console.log("Game is over now, winner declared");
    console.log("********************************************************************************");

    const winner = await miniGame.fetchWinner();
    console.log("Winning team : ", winner);
    console.log("********************************************************************************");
}

mainMethod()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
