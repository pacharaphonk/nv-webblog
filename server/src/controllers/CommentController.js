const {Comment} = require('../models')

module.exports = {
    
    async index (req, res) {
        try {
            const comments = await Comment.findAll()
            res.send(comments)
        }catch(err){
            res.status(500).send({
                error: 'The comments information was incorrect'
            })
        }
    },
    //create comment
    async create (req, res) {
        //res.send(JSON.stringifiy(req,body))
        try{
            const comment = await Comment.create(req,body)
            res.send(comment.toJSON())
        }catch(err){
            res.status(500).send({
                error: 'Create commit incorrect'
            })
        }
    },
    //edit comment, suspend, active
    async put(req, res) {
        try {
            await Comment.update(req.body, {
                where: {
                    id: req.params.commentId
                }
            })
            res.send(req.body)
        }catch(err) {
            req.status(500).send({
                error: 'Update comment incorrect'
            })
        }
    },
    //detele comment
    async remove (req, res) {
        try{
            const comment = await Comment.findOne({
                where: {
                    id: req.params.commentId
                }
            })
            if(!comment){
                return res.status(403).send({
                    error: 'The comment information was inrrect'
                })
            }
            await comment.destroy()
            res.send(comment)
        }catch(err) {
            req.status(500).send({
                error: 'The comment information was incorrrect'
            })
        }
    },
    //get comment by id
    async show (req, res){
        try {
            const comment = await Comment.findByPK(req.params.commentId)
            res.send(comment)
        }catch(err){
            req.status(500).send({
                error: 'The comment informaton was incorrect'
            })
        }
    }
}