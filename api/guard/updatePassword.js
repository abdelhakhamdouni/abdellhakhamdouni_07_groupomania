const User = require("../models").User
const randomString = require('../utils/randomString')
const bcrypt = require('bcrypt')

const salt = process.env.salt

module.exports = async (req, res) => {
    let email = req.body.email
    console.log("REQEST BODY", req.body )
    let user = await User.findOne({where: {email}})
    if(user){
        let password = randomString(8)
        bcrypt.hash(password, salt, (err, hash)=>{
            User.update({password: hash}, {where: {email}}).then((user, error) =>{
                if(error) {
                    console.log(error)
                    res.status(500).json({err: "Imposible de reinitialiser votre mot de passe."})
                    return 
                }
                else res.status(200).json({password})
            })
        })
    }
    else res.status(200).json({err: "Imposible de reinitialiser votre mot de passe."})
}