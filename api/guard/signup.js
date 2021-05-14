const User = require("../models").User
/**
 * create user in database
 * @param {Request} req 
 * @param {Response} res 
 * @param {Callback} next 
 */

module.exports = async (req, res, next) =>{

    req.file ? 
    req.body.avatar = req.file.filename : 
    req.body.avatar = null
    
    console.log("create posts=============>",req.body)

    User.create(req.body).then(()=>{
        res.status(201).json({succes:" user added"})

    })
    .catch(err => {
        res.status(500).json({error_handler:"SIGNUP",err :err.errors[0].message})
    })
    
}