const fsOrigin = require('fs')
const fs = require('fs').promises
const path = require('path')
const Post = require('../models').Post
const User = require('../models').User
const Comment = require('../models').Comment
const Likes = require('../models').Likes
const formatUser = require('../utils/formatUser')
const { Op } = require("sequelize");

module.exports = {

    /**
     * Create post 
     * @param {formdata} fromdata
     * @param {*} req  
     * @param {*} res 
     */
    createPost: async (req, res) => {
        console.log(req.body)
        let postData = JSON.parse(req.body.post)
        if (req.file) postData.image = req.file.filename
        Post.create(postData)
            .then(async () => {
                console.log('ok')
                let posts = await Post.findAll({
                    include: {
                        model: User
                    }
                })
                posts ? res.status(200).json(posts) : res.status(500).json({ error: "POST_CREATED_ERROR" })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ error: "POST_CREATED_ERROR" })
            })
    },

    /**
     * getAll posts
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getAllPostsByUserId: async (req, res, next) => {

        let id = req.params.id
        let posts = await Post.find({ where: { UserId: id }, include: [User, Comment, Likes] })
        if (posts) {
            if (posts.length === 0) res.status(200).json("aucun post trouvé !")
            else {
                posts.forEach(function (post, index) {
                    post.image = `${req.protocol}://${req.host}/uploads/posts_image/${post.image}`
                    post.User = formatUser(post.User, req)
                    if (index === posts.length - 1) {
                        res.status(200).json(posts)
                    }
                });
            }

        }
        else res.status(500).json({ error: "POST_GETALL_ERROR" })
    },

    /**
     * Get all posts 
     * @param {*} req 
     * @param {*} res 
     */
    getAllPosts: async (req, res) => {
        let posts = await Post.findAll({ include: [User, Comment, Likes], order: [['updatedAt', 'DESC']] })
        if (posts) {
            if (posts.length === 0) res.status(200).json([])
            else {
                posts.forEach(function (post, index) {
                    post.image = `${req.protocol}://${req.get('host')}/uploads/posts_image/${post.image}`
                    post.User = formatUser(post.User, req)
                    if (index === posts.length - 1) {
                        res.status(200).json(posts)
                    }
                });
            }
        }
        else res.status(500).json({ error: "POST_GETALL_ERROR" })
    },
    getLastPosts: async (req, res) => {
        let posts = await Post.findAll({
            order: [
                ['updatedAt', 'DESC']
            ],
            limit: 5,
            include: [User, Comment, Likes]
        })
        if (posts) {
            if (posts.length === 0) res.status(200).json([])
            else {
                posts.forEach(function (post, index) {
                    post.image = `${req.protocol}://${req.get('host')}/uploads/posts_image/${post.image}`
                    post.User = formatUser(post.User, req)
                    if (index === posts.length - 1) {
                        res.status(200).json(posts)
                    }
                });
            }
        }
        else res.status(500).json({ error: "POST_GETALL_ERROR" })
    },

    /**
     * Get one post by id 
     * @param {*} req 
     * @param {*} res 
     */
    getOnePost: async (req, res) => {
        let id = req.params.id
        console.log(id)
        Post.findOne({
            where: { id }, include: [
                User,
                {
                    model: Comment,
                    group: ['CommentId']
                },
                Likes
            ],
        })
            .then(post => {
                post.image = `${req.protocol}://${req.get('host')}/uploads/posts_image/${post.image}`
                post.User = formatUser(post.User, req)
                res.status(200).json(post)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ error: "POST_GET_ONE_ERROR", err })
            })
    },

    /**
     * Update post 
     * @param {FormData} formdata
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    updatePost: async (req, res, next) => {
        console.log("update Post ===========================")
        let postData = JSON.parse(req.body.post)
        let id = req.params.id
        Post.findOne({ where: { id } })
            .then(post => {
                req.file ? postData.image = req.file.filename : postData.image = post.image
                post.update(postData)
                    .then(async () => {
                        console.log('ok')
                        let posts = await Post.findAll({ include: [User, Comment, Likes], order: [['updatedAt', 'DESC']] })
                        if (posts) {
                            posts.forEach(function (post, index) {
                                post.image = `${req.protocol}://${req.get('host')}/uploads/posts_image/${post.image}`
                                post.User = formatUser(post.User, req)
                                if (index === posts.length - 1) {
                                    res.status(200).json(posts)
                                }
                            });
                        }
                        else {
                            console.log(error)
                            res.status(500).json({ error: "POST_CREATED_ERROR" })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({ error: "POST_CREATED_ERROR" })
                    })
            })
    },

    /**
     * Delete post
     * @param {number} id
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    deletePost: async (req, res, next) => {
        let postId = req.params.id
        const post = await Post.findOne({ where: { id: postId }, include:[Comment, Likes] })
        if (post.image !== null) {
            let imagePath = path.join(__dirname, '../uploads/posts_image/' + post.image.trim())
            if(fsOrigin.existsSync(imagePath)){
                await fs.unlink(imagePath)
            }
        }
        post.Comments.forEach(comment=> comment.destroy())
        post.Likes.forEach(like => like.destroy())
        await post.destroy()
            .then(() => res.status(200).json("post supprimé"))
            .catch(err => res.status(500).json("le post n'as pas pu étre supprimé !", err))
    },

    likePost: async (req, res, next) => {
        console.log(req.body)
        let { UserId, PostId, like } = req.body
        Post.findOne({ where: { id: PostId } })
            .then(post => {
                post.update({lastUpdate: new Date()})
            })

        if (like == 0) {
            const _like = await Likes.create({ UserId, PostId, like })
            if (_like) res.status(201).json("ok")
            else res.status(200).json({ err: "impossible de créer le like" })
        } else {
            const _like = await Likes.findOne({ where: { [Op.and]: [{ UserId, PostId }] } })
            const response = _like.destroy()
            if (response) res.status(201).json("ok")
            else res.status(200).json({ err: "impossible de créer le like" })
        }
    },

    getLastLikes: async (req, res) =>{
        let likes = await Likes.findAll({limit: 5, order:[["createdAt", "DESC"]], include:[Post, User]})
        if(likes){
            res.status(200).json(likes)
        }
        else{
            console.log("error get last likes ")
            res.status(500).json({err: "cant get last likes "})
        }

    }
}