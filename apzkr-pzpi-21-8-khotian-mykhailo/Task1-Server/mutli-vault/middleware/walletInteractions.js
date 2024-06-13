const { Web3 } = require("web3")

const web3 = new Web3('https://sepolia.blast.io')

async function createWallet(){
    const wallet = await web3.eth.accounts.wallet.create(1)    
    
    return wallet[0]
}

function importWallet(privateKey){
    const wallet = web3.eth.accounts.wallet.add(privateKey)   
    console.log(wallet[0])
    
    return wallet[0]
}

async function sendTrx(address, reciever, value){
    const transactionHash  = await web3.eth.sendTransaction({
        from: address,
        to: reciever,
        value: web3.utils.toWei(value, 'ether'),
        gasLimit: 30000,
        gasPrice: await web3.eth.getGasPrice(),
        nonce: await web3.eth.getTransactionCount(address) 

    }).catch((err)=>{
        console.log(err)
    });

    console.log(transactionHash);
}

module.exports = {createWallet, importWallet, sendTrx}
