const bcrypt = require('bcrypt')
const User = require('../../models').User
require('dotenv').config()

module.exports = (req, res, next) => {
    const pass = req.body.password
    const encrytedPass = req.body.user.password
    console.log(req.body.password, req.body.user.password)
    bcrypt.compare(
        pass, 
        encrytedPass, 
            (err, result) => {
                console.log("====================================", result)
                !result ? res.status(403).json({err_handler: "BCRYPT", err}) : next() 
            }
        )
}