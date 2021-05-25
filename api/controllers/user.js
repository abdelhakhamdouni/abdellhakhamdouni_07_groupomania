const fs = require('fs').promises
const path = require('path')
const User = require('../models').User
const Post = require('../models').Post
const Comment = require('../models').Comment
const Likes = require('../models').Likes
const formatUser = require('../utils/formatUser')
const bcrypt = require('bcrypt')
require('dotenv').config()

const salt = parseInt(process.env.SALT)

module.exports = {

    getOneUser: async (req, res, next) => {
        let id = req.params.id
        let user = await User.findOne({where: {id: id}, include:[{model: Post, include:[Comment]}]})
        user.Posts.forEach(post=> post.image = `${req.protocol}://${req.get('host')}/uploads/posts_image/${post.image}`)
        let formatedUser = formatUser(user, req)
        user ? res.status(200).json(formatedUser) : res.status(500).json({ err_handler: "GET_ONE_USER", err: "user introubale" })
    },

    getAllUsers: async (req, res) => {
        let formatedUsers = []
        let users = await User.findAll({include:[Post, Comment, Likes]})
        if (users) {
            formatedUsers = users.map(user => (formatUser(user, req)))
            res.status(200).json(formatedUsers)
        }
        else res.status(500).json({ err: "user introubale" })
    },

    updateUserAvatar: async (req, res, next) => {
        let id = req.params.id

        let user = await User.findByPk(id)
        if(!user.image){            
            fs.unlink(path.join(__dirname, '/uploads/users_avatar/'+user.image))
        }
        User.update({ avatar: req.file.filename }, { where: { id: id } }
        )
            .then(() => res.status(200).json({ succes: "user updated" }))
            .catch(() => res.status(500).json({ err_handler: "UPDATE_USER", err: "user introubale" }))
    },


    updateUserPassword: async (req, res, next) => {
        let id = req.body.id
        let password = req.body.password
        bcrypt.hash(password, "salt", function (err, hash) {
            if (err) {
                console.log(err)
                res.status(500).json({ err_handler: "UPDATE_PASSWORD_USER_HASH", err: err })
            }
            else {
                User.update({ password: hash }, { where: { id: id } })
                    .then(() => res.status(200).json({ success: "user updated" }))
                    .catch((err) => res.status(500).json({ err_handler: "UPDATE_PASSWORD_USER", err: err }))
            }
        })
    },

    updateUserFullName: async (req, res, next) => {
        let id = req.params.id
        console.log(req.body)
        User.update({ lastName: req.body.lastName, firstName: req.body.firstName }, { where: { id: id } }
        )
            .then(() => res.status(200).json({ succes: "user updated" }))
            .catch((err) => {
                console.log(err)
                res.status(500).json({ err_handler: "UPDATE_USER", err: err})
            })
    },


}