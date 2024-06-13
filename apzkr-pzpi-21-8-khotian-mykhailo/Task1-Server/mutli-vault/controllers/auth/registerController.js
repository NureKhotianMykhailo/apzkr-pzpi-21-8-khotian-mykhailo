const User = require('../../model/User')
const bcrypt = require('bcrypt')
const {createWallet} = require('../../middleware/walletInteractions')

const handleNewUser = async (req, res) => {
    const { user, email, pwd } = req.body
    if(!email || !pwd) return res.status(400).json({'message': 'Email and password are required.'})
    

    const duplicateEmail = await User.findOne({email: email}).exec()
    const duplicateNick = await User.findOne({username: user}).exec()
    if(duplicateEmail || duplicateNick) return res.sendStatus(409)
    try{

        const hashedPwd = await bcrypt.hash(pwd, 10)
        
        const wallet = await createWallet();

        const result = await User.create(
        {
            "email": email,
            "username": user,
            'password': hashedPwd,
            "wallet":{
                "adress": wallet.address,
                "privateKey": wallet.privateKey
            }
        })
        
        console.log(result)
        
        res.status(201).json({'success': `New user ${email} created.`})
    } catch (err) {
        res.status(500).json({'message': err.message})
    }
}

module.exports = {handleNewUser}