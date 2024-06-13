const { importWallet, sendTrx } = require('../middleware/walletInteractions')

const { Web3 } = require("web3")
const web3 = new Web3('https://sepolia.blast.io')

const USDC_ADDRESS = "0xda9C093a7D9e41d21Dc9A7ff5601A3FD02111d95"
const USDT_ADDRESS = "0x7Cb0C805544C5BA83A6e014A9e199E1C8ed16137"
const IGNITE_ADRESS = "0xA843520d406cfF0D648E4F6B6833C987ccB9Ef14"

const TRANSACTION_COUNT = 12n;

async function getTokenBallance  (address, token, decimals) {
    const responce = await fetch(`https://api-sepolia.blastscan.io/api?module=account&action=tokenbalance&contractaddress=${token}&address=${address}&tag=latest&apikey=YourApiKeyToken`)
    const data = await responce.json();
    return parseFloat(data.result) / Math.pow(10, decimals) ?? 0;
}

async function getEthPrice  () {
    const responce = await fetch("https://api-sepolia.blastscan.io/api?module=stats&action=ethprice&apikey=YourApiKeyToken")
    const data = await responce.json();
    return data? data.result? data.result.ethusd : "3000.00000" : "3000.00001";
}

async function findBlockForTransactionCount(address, targetCount, fromBlock, toBlock) {
    let counter = 0;
    while (fromBlock <= toBlock) {
        const midBlock = BigInt((fromBlock + toBlock) / 2n);
        let txCount;
        try {
            txCount = await web3.eth.getTransactionCount(address, midBlock);
        } catch (error) {
            console.log(`Block-Find-ERROR: ${error}`)
        }

        if (txCount < targetCount) {  
            fromBlock = midBlock + 1n;
        } else { 
            toBlock = midBlock - 1n; 
        }
        counter +=1;   
    }
    return fromBlock;
}

async function getLastNTransactionBlocks(address, n) {
    const latestBlock = await web3.eth.getBlockNumber();
    const latestTxCount = await web3.eth.getTransactionCount(address, latestBlock);
    const lBlock = await findBlockForTransactionCount(address, latestTxCount, 
        0n, latestBlock);

    const blocks = [];

    if (n > latestTxCount) n = latestTxCount
    
    for (let i = 0n; i < n; i++) {
        const targetTxCount = latestTxCount - (n - i - 1n);
        const block = await findBlockForTransactionCount(address, targetTxCount, 
            blocks.length!=0? blocks[blocks.length - 1] + 1n : 0n, lBlock);
        blocks.push(block); 
    }
    return blocks;
}

async function getBalancesForBlocks(address, blocks) {
    const balances = [];
    for (const block of blocks) {
        const ba = await web3.eth.getBalance(address, block)
        const balance = web3.utils.fromWei(ba, "ether");
        const timestamp = (await web3.eth.getBlock(block)).timestamp
        balances.push({"bal":balance.toString().substring(-1),"time": Number(timestamp) * 1000});
    }
    return balances;
}

async function getETHHistory (address/*, token*/) {
    try {
        const blocks = await getLastNTransactionBlocks(address, TRANSACTION_COUNT);
        const balances = await getBalancesForBlocks(address, blocks);
        console.log("=====BLOCKS=====")
        console.log(blocks);
        console.log("=====BALANCES===")
        console.log(balances);
        return balances
    } catch (error) {
        return null
    }

}

async function getTokens(address) {
    try {
        await new Promise(resolve => setTimeout(resolve, 210));
        const ethBall = web3.utils.fromWei(await web3.eth.getBalance(address), "ether");
        await new Promise(resolve => setTimeout(resolve, 210));
        const usdcBall = await getTokenBallance(address, USDC_ADDRESS, 6)
        await new Promise(resolve => setTimeout(resolve, 210));
        const usdtBall = await getTokenBallance(address, USDT_ADDRESS, 6)
        await new Promise(resolve => setTimeout(resolve, 420));
        const igniteBall = await getTokenBallance(address, IGNITE_ADRESS, 18)
        await new Promise(resolve => setTimeout(resolve, 110));
        const price = await getEthPrice();
    
        const resp = {
            "eth": ethBall.toString(),
            "usdt":usdtBall.toString(), 
            "usdc": usdcBall.toString(), 
            "ignite": igniteBall.toString(),
            "ethValue": price? price.toString() : "3010.2301"}
        return resp
    } catch (error) {
        return null
    }

}

const getWallet = async (req, res) => {
    const adr = req.body.address || req.jwtaddress

    const jsonres = await getTokens(adr)
    if(!jsonres) {
        res.sendStatus(400)
        return
    }

    console.log("=====TOKENS=====")
    console.log(jsonres)
    res.json(jsonres)
}

const getBallance = async (req, res) => {
    const adr = req.body.address || req.jwtaddress

    const bal = await getETHHistory(adr)
    if(!bal) {
        res.sendStatus(400)
        return
    }

    res.json(bal)
}

const sendTransaction = async (req, res) => {
    console.log("=====sendTRX=====")
    const pk = req.jwtpk;
    const reciever = req.body?.reciever
    const amount = req.body?.amount
    if(!pk || !reciever || !amount) {
        res.sendStatus(400)
        return
    }

    try {
        wallet = importWallet(pk)
        sendTrx(wallet.address, reciever, amount)
    } catch (err) {
        res.sendStatus(400)
    }

    res.sendStatus(200)
}

module.exports = {
    getWallet,
    getBallance,
    sendTransaction
}