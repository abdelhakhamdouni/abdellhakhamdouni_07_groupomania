const fs = require('fs').promises
const path = require('path')
const Post = require('../models').Post
const User = require('../models').User
const Comment = require('../models').Comment
const formatUser = require('../utils/formatUser')

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
        postData.image = req.file.filename
        Post.create(postData)
            .then(async () => {
                console.log('ok')
                let posts = await Post.findAll({
                    include: {
                        model: User
                    }
                })
                if (posts) {
                    //let formatedPosts = posts.map(post=>post.User.filter(key => key != password))
                    res.status(200).json(posts)
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
    },

    /**
     * getAll posts
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getAllPostsByUserId: async (req, res, next) => {

        let id = req.params.id
        let posts = await Post.find({ where: { UserId: id }, include: [User, Comment] })
        if (posts) {
            if (posts.length === 0) res.status(200).json("aucun post trouvé !")
            else{
                posts.forEach(function(post, index){
                    post.image = `${req.protocol}://${req.host}/uploads/posts_image/${post.image}`
                    post.User = formatUser(post.User, req)
                    if(index === posts.length -1 ){
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
        let posts = await Post.findAll({ include: [User, Comment] })
        if (posts) {
            if (posts.length === 0) res.status(200).json([])
            else{
                posts.forEach(function(post, index){
                    post.image = `${req.protocol}://${req.get('host')}/uploads/posts_image/${post.image}`
                    post.User = formatUser(post.User,req)
                    if(index === posts.length -1){
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
        Post.findOne({ where: { id }, include: [User, Comment] })
            .then(post => {
                    post.image = `${req.protocol}://${req.get('host')}/uploads/posts_image/${post.image}`
                    post.User = formatUser(post.User)
                    res.status(200).json(post)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ error: "POST_GET_ONE_ERROR" })
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
        let postData = JSON.parse(req.body.post)
        let postId = req.params.id
        postData.image = req.protocol + "://" + req.get("host") + '/uploads/images/' + req.file.filename || null
        Post.findOne({ where: { id } })
            .then(post => {
                post.update(postData)
                    .then(async () => {
                        console.log('ok')
                        let posts = await Post.findAll({
                            include: {
                                model: User
                            }
                        })
                        if (posts) {
                            //let formatedPosts = posts.map(post=>post.User.filter(key => key != password))
                            res.status(200).json(posts)
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
        const post = await Post.findOne({ where: { id: postId } })
        let imagePath = path.join(__dirname,'../uploads/posts_image/' + post.image.trim())
        await fs.unlink(imagePath)
        await post.destroy()
            .then(() => res.status(200).json("post supprimé"))
            .catch(err => res.status(500).json("le post n'as pas pu étre supprimé !", err))
    },
}