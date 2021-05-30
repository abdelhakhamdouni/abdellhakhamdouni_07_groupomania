const fs = require('fs')
const path = require('path')
const Post = require('../models').Post
const User = require('../models').User
const bcrypt = require('bcrypt')

module.exports =  async (req, res) => {
    let id = req.params.id
    let password = req.body.password
    let adminId = req.body.id
    let admin = await User.findByFk(adminId)
    let user = await User.findOne({where: {id}, include:[Post]})
    bcrypt.compare(password, admin.password, async (err) => {
        if(!err){
            if(user.Posts && user.Posts.length > 0){
                user.Posts.forEach(post=>{
                    if(post.image){
                        let pathName =  path.join(__dirname, '../uploads/posts_image/' + post.image.trim())
                        fs.unlink(pathName)
                    }
                })
            }
            if(user.image){
                let pathName =  path.join(__dirname, '../uploads/users_image/' + user.image.trim())
                fs.unlink(pathName)
            }
            let deleted = await user.destroy()
            deleted ? res.status(200).json({ success: "user deleted " }) : res.status(500).json({ err_handler: "DELETE_USER", err: "user introubale" })
        }
        else{
            res.status(200).json({ err_handler: "DELETE_USER", err: "Vous n'avez pas le droit de supprimer cet utilisateur !" })
        }
    })
}