require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const cookieParser = require('cookie-parser');
const {sendTrx, createWallet, importWallet} = require('./middleware/walletInteractions')
const PORT = process.env.PORT || 3001;


app.use(credentials);
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    wallet = importWallet("0xa0768ff724d3ecadfd2905dba9a2d27274dcb381d6a23ca118b23482d635f3ff")
    console.log(wallet.address)
    //sendTrx(wallet.address, "0x4f19b886C5Cc4ac9Ca32596D2bBCf760928703B8" , 0.000001)
});


