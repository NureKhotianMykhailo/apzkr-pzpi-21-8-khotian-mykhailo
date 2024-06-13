const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/index', 
    (req, res) => {
    res.json({message: "1"})
});

module.exports = router;