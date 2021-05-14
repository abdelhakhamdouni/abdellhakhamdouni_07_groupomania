const Post = require('../models').Post
const User = require('../models').User
const Comment = require('../models').Comment


module.exports = {
    
    /**
     * Create comment 
     * @param {Json} json
     * @param {*} req  
     * @param {*} res 
     */
    createComment: async (req,res)=>{
        console.log(req.body)

        Comment.create(req.body)
        .then(async (comment)=>{
            if(req.body.CommentId === 0){
                comment.update({CommentId : comment.id}).then(()=>{
                    //let formatedPosts = posts.map(post=>post.User.filter(key => key != password))
                    res.status(200).json("comment created !")
                })
            }
            else{
                res.status(200).json("comment created !")
            }
        })
        .catch(err=> {
            console.log(err)
            res.status(500).json({error: "COMMENT_CREATED_ERROR"})
        })
    },

    /**
     * getAll comments
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getAllCommentsByPostId: async (req,res,next)=>{

        let id = req.params.id
        let comments = await Comment.find({where: {PostId: id}})
        if(comments){
            if(comments.length === 0 )res.status(200).json("aucun comment trouvé !")
            res.status(200).json(comments)
        }
        else res.status(500).json({error: "POST_GETALL_ERROR"})
    },

    /**
     * Get all comments 
     * @param {*} req 
     * @param {*} res 
     */
    getAllComments: async (req,res)=>{
        let comments = await Comment.findAll()
        if(comments){
            if(comments.length === 0 )res.status(200).json("aucun post trouvé !")
            res.status(200).json(comments)
        }
        else res.status(500).json({error: "COMMENTS_GETALL_ERROR"})
    },

    /**
     * Get one comment by id 
     * @param {*} req 
     * @param {*} res 
     */
    getOneComment: async (req,res)=>{
        let id = req.params.id
        console.log(id)
        Comment.findOne({ where: {id}})
        .then(comment => res.status(200).json({sucess: "post created", comment}))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "COMMENT_GET_ONE_ERROR"})
        })
    },

    /**
     * Update comment 
     * @param {FormData} formdata
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    updateComment: async (req,res,next)=>{
        let postId = req.params.id

        Comment.findOne({where: {id}})
        .then(post=>{
            post.update(req.body)
            .then(async ()=>{
                //let formatedPosts = posts.map(post=>post.User.filter(key => key != password))
                res.status(200).json(posts)
            })
            .catch(err=> {
                console.log(err)
                res.status(500).json({error: "COMMENT_CREATED_ERROR"})
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
    deleteComment: async (req,res,next)=>{
        let commentId = req.params.id
        const comment = await Comment.findOne({where: {id: commentId}})
        await comment.destroy()
                .then(()=> res.status(200).json("comment supprimé"))
                .catch(err=> res.status(500).json("le comment n'as pas pu étre supprimé !", err))
    },
}