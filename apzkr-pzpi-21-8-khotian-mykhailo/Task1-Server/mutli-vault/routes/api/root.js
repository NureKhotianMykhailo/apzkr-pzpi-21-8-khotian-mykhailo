const express = require('express');
const router = express.Router();
const path = require('path');

const walletController = require('../../controllers/walletController');
const verifyJWT = require('../../middleware/verifyJWT');

router.post('/wallet',  verifyJWT, walletController.getWallet);
router.post('/balance', verifyJWT, walletController.getBallance);
router.post('/sendtrx', verifyJWT, walletController.sendTransaction)

module.exports = router; 