const User = require('../models').User
const Message = require('../models').Message
const formatUser = require('../utils/formatUser')
const { Op } = require("sequelize");

module.exports = {

    /**
     * Create Message 
     * @param {formdata} fromdata
     * @param {*} req  
     * @param {*} res 
     */
    createMessage: async (req, res) => {
        Message.create(req.body)
            .then(async () => {
                console.log('ok')
                let messages = await Message.findAll({
                    include: {
                        model: User
                    }
                })
                messages ? res.status(200).json(messages) : res.status(500).json({ error: "Message_CREATED_ERROR" })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ error: "Message_CREATED_ERROR" })
            })
    },

    /**
     * getAll Messages
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getAllMessagesByUserId: async (req, res, next) => {

        let id = req.params.id
        let Messages = await Message.find({ where: { UserId: id }, include: [User, Comment, Likes] })
        if (Messages) {
            if (Messages.length === 0) res.status(200).json("aucun Message trouvé !")
            else {
                Messages.forEach(function (Message, index) {
                    Message.image = `${req.protocol}://${req.host}/uploads/Messages_image/${Message.image}`
                    Message.User = formatUser(Message.User, req)
                    if (index === Messages.length - 1) {
                        res.status(200).json(Messages)
                    }
                });
            }

        }
        else res.status(500).json({ error: "Message_GETALL_ERROR" })
    },

    /**
     * Get all Messages 
     * @param {*} req 
     * @param {*} res 
     */
    getAllMessages: async (req, res) => {
        let messages = await Message.findAll({ order:[['createdAt', 'ASC']], include: [User], })
        if (messages) {
            if (messages.length === 0) res.status(200).json([])
            else {
                messages.forEach(function (message, index) {
                    message.User = formatUser(message.User, req)
                    if (index === messages.length - 1) {
                        res.status(200).json(messages)
                    }
                });
            }
        }
        else res.status(500).json({ error: "Message_GETALL_ERROR" })
    },
    getLastMessages: async (req, res) => {
        let messages = await Message.findAll({
            order: [
                ['updatedAt', 'DESC']
            ],
            limit: 5,
            include: [User, Comment, Likes]
        })
        if (messages) {
            if (messages.length === 0) res.status(200).json([])
            else {
                messages.forEach(function (Message, index) {
                    Message.User = formatUser(Message.User, req)
                    if (index === messages.length - 1) {
                        res.status(200).json(messages)
                    }
                });
            }
        }
        else res.status(500).json({ error: "Message_GETALL_ERROR" })
    },

    /**
     * Get one Message by id 
     * @param {*} req 
     * @param {*} res 
     */
    getOneMessage: async (req, res) => {
        let id = req.params.id
        console.log(id)
        Message.findOne({
            where: { id }, include: [
                User,
                {
                    model: Comment,
                    group: ['CommentId']
                },
                Likes
            ],
        })
            .then(Message => {
                Message.image = `${req.protocol}://${req.get('host')}/uploads/Messages_image/${Message.image}`
                Message.User = formatUser(Message.User, req)
                res.status(200).json(Message)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ error: "Message_GET_ONE_ERROR", err })
            })
    },

    /**
     * Update Message 
     * @param {FormData} formdata
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    updateMessage: async (req, res, next) => {
        console.log("update Message ===========================")
        let MessageData = JSON.parse(req.body.Message)
        let id = req.params.id
        Message.findOne({ where: { id } })
            .then(Message => {
                req.file ? MessageData.image = req.file.filename : MessageData.image = Message.image
                Message.update(MessageData)
                    .then(async () => {
                        console.log('ok')
                        let Messages = await Message.findAll({ include: [User, Comment, Likes], order: [['updatedAt', 'DESC']] })
                        if (Messages) {
                            Messages.forEach(function (Message, index) {
                                Message.image = `${req.protocol}://${req.get('host')}/uploads/Messages_image/${Message.image}`
                                Message.User = formatUser(Message.User, req)
                                if (index === Messages.length - 1) {
                                    res.status(200).json(Messages)
                                }
                            });
                        }
                        else {
                            console.log(error)
                            res.status(500).json({ error: "Message_CREATED_ERROR" })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({ error: "Message_CREATED_ERROR" })
                    })
            })
    },

    /**
     * Delete Message
     * @param {number} id
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    deleteMessage: async (req, res, next) => {
        let messageId = req.params.id
        const Message = await Message.findOne({ where: { id: messageId } })
        await Message.destroy()
            .then(() => res.status(200).json("Message supprimé"))
            .catch(err => res.status(500).json("le Message n'as pas pu étre supprimé !", err))
    },

    likeMessage: async (req, res, next) => {
        console.log(req.body)
        let { UserId, messageId, like } = req.body
        Message.findOne({ where: { id: messageId } })
            .then(Message => {
                Message.update({lastUpdate: new Date()})
            })

        if (like == 0) {
            const _like = await Likes.create({ UserId, messageId, like })
            if (_like) res.status(201).json("ok")
            else res.status(200).json({ err: "impossible de créer le like" })
        } else {
            const _like = await Likes.findOne({ where: { [Op.and]: [{ UserId, messageId }] } })
            const response = _like.destroy()
            if (response) res.status(201).json("ok")
            else res.status(200).json({ err: "impossible de créer le like" })
        }
    }
}