const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const verifyJWT = require('../../middleware/verifyJWT');


// router.route('/')
//     .get(verifyJWT, userController.getUser)
//     .put(verifyJWT, userController.updateUser);

// router.route('/:id')
//     .get(verifyJWT, userController.getUserById);

router.route('/')
    .get(verifyJWT, userController.getUser)
    .put(verifyJWT, userController.updateUser);

module.exports = router;