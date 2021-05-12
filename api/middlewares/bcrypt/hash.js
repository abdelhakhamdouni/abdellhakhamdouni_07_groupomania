const bcrypt = require('bcrypt')
require('dotenv').config()

const salt = parseInt(process.env.SALT)

module.exports = (req, res, next) => {
    req.body = JSON.parse(req.body.user)
    console.log("HASH=> ",req.body)
    const pass = req.body.password
    bcrypt.hash(
        pass,
        salt,
        (err, hash) => {
            if (err) res.status(500).json({error_handler: "BCRYPT_HASH", err })
            else {
                req.body.password = hash
                next()
            }
        }
    )
}