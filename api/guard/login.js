const User = require("../models").User
/**
 * create user in database
 * @param {Request} req 
 * @param {Response} res 
 * @param {Callback} next 
 */

module.exports = async (req, res, next) => {
    let email = req.body.email
    console.log(email)
    const user = await User.findOne({where: {email}})
    if (user === null) {
        res.status(200).json({err: 'Votre email ou mot de passe incorrect !'});
    } else {
        console.log(user)
        req.body.user = user
        next()
    }
       
}