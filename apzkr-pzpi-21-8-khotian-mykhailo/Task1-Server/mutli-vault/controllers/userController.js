const User = require('../model/User');

//for debug purpose
const getAllUser = async (req, res) => {
    const user = await User.find();
    if (!user) return res.sendStatus(204).json({ 'message': 'No user at all!' });
    res.json(user)
}

const createNewUser = async (req, res) => {
    if (!req?.body?.name) {
        return res.sendStatus(400).json({ 'message': 'Name are required!' });
    }

    try {
        const result = await User.create({
            name: req.body.name
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateUser = async (req, res) => {
    if (!req?.user) return res.status(400).json({ 'message': 'User ID required' });
    const user = await User.findOne({ username: req.user }).exec();
    if (!user) {
        return res.status(204).json({ "message": `No user with ID ${req.user}.` });
    }

    if (req.body?.username) user.username = req.body.username;
    if (req.body?.email) user.email = req.body.email;
  
    if (req.body?.password) {
        const bcrypt = require('bcrypt');
        const hashedPwd = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPwd;
    }

    if (req.body?.staredAccounts){
        if (user.staredAccounts.includes(req.body.staredAccounts)){
            user.staredAccounts.pop(req.body.staredAccounts)
        } else {
            user.staredAccounts.push(req.body.staredAccounts)
        } 
    } 
    if (req.body?.settings) {
        if(req.body?.settings?.isEngLanguage != undefined) {
            user.settings.isEngLanguage = req.body.settings.isEngLanguage
        }
        if(req.body?.settings?.isEngRegion != undefined) {
            user.settings.isEngRegion = req.body.settings.isEngRegion
        }   
        if(req.body?.settings?.hideEmptyTokens != undefined) {
            user.settings.hideEmptyTokens = req.body.settings.hideEmptyTokens
        }
    }
   
    const result = await user.save();
    //console.log(result);
    res.json(result); 
}

const deleteUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'User ID required' });

    const user_one = await User.findOne({ _id: req.body.id }).exec();
    if (!user_one) {
        return res.status(204).json({ "message": `No user with ID ${req.body.id}.` });
    }
    const result = await user_one.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getUser = async (req, res) => {

    if (!req?.user) return res.status(400).json({ 'message': 'User ID required!' });

    const user = await User.findOne({ username: req.user }).exec();
    if (!user) {
        return res.status(204).json({ "message": `No user with ID ${req.user}.` });
    }
    const data = user._doc;
    const { refreshTokenMobile, password, refreshToken, wallet, ...rest } = data;

    rest.wallet = data.wallet.adress;
    res.json(rest);
}

const getUserById = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'User ID required' });

    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(204).json({ "message": `No User with ID ${req.params.id}.` });
    }
    res.json({ "username": user.username});
}

module.exports = {

    updateUser,
    getUser,
    getUserById
}