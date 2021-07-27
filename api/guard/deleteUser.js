const fs = require('fs').promises
const path = require('path')
const Post = require('../models').Post
const User = require('../models').User
const Like = require('../models').Likes
const Comment = require('../models').Comment
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
    let id = req.params.id
    let password = req.body.pass
    let adminId = req.logedUserId
    let admin = await User.findByPk(adminId)
    let user = await User.findOne({ where: { id }, include: [Post, Like, Comment] })
    if (admin.isAdmin || admin.id == user.id) {
        console.log(password, admin.password)
        bcrypt.compare(password, admin.password, async (err, result) => {
            if (!err) {
                if (user.Posts && user.Posts.length > 0) {
                    user.Posts.forEach(async post => {
                        if (post.image) {
                            let pathName = path.join(__dirname, '../uploads/posts_image/' + post.image.trim())
                            await fs.unlink(pathName)
                        }
                        post.destroy()
                    })
                }
                if (user.image) {
                    let pathName = path.join(__dirname, '../uploads/users_image/' + user.image.trim())
                    await fs.unlink(pathName)
                }
                let deleted = await user.destroy()
                deleted ? res.status(200).json({ success: "user deleted " }) : res.status(500).json({ err_handler: "DELETE_USER", err: "user introubale" })
            }
            else {
                res.status(403).json({ err_handler: "DELETE_USER", err: "Vous n'avez pas le droit de supprimer cet utilisateur !" })
            }
        })
    }
    else {
        res.status(403).json({ err_handler: "DELETE_USER", err: "Vous n'avez pas le droit de supprimer cet utilisateur !" })
    }
}