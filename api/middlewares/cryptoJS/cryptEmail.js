const CryptoJS = require('crypto-js')
/**
 * create user in database
 * @param {Request} req 
 * @param {Response} res 
 * @param {Callback} next 
 */
module.exports = async (req, res, next) => {

    let email = req.body.email

    const KEY = process.env.KEY
    const IV = process.env.IV

    var key = CryptoJS.enc.Hex.parse(KEY);
    var iv = CryptoJS.enc.Hex.parse(IV);

    var encrypted = CryptoJS.AES.encrypt(email, key, { iv: iv });
    if(encrypted){
        req.body.email = encrypted.toString()
        next()
    }else{
        res.status(500).json('erreur encrypt email')
    }

}