const User = require("../models").User
const Post = require("../models").Post
/**
 * create user in database
 * @param {Request} req 
 * @param {Response} res 
 * @param {Callback} next 
 */

module.exports = async (req, res, next) => {
    let email = req.body.email
    console.log(email)
    const user = await User.findOne({where: {email}, include:[Post]})
    if (user === null) {
        res.status(400).json({err: 'Votre email ou mot de passe sont incorrect !'});
    } else {
        req.body.user = user
        next()
    }
}