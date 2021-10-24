const Post = require('../models/post.model')
const Comment = require('../models/comment.model')
const fs = require('fs')
const path = require('path');

// Admin
module.exports.createNewPost = async (req, res) => {
    const imageToBase64 = 'data:image/jpg;base64,' +  fs.readFileSync(path.resolve(__dirname, `../static/${req.file.filename}`), {encoding: 'base64'})
    const post =  new Post({
        title: req.body.title,
        content: req.body.text,
        imageUrl: imageToBase64,
        imageName: req.file.filename
    })
    try {
        await post.save()
        res.status(201).json(post)
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.getAllAdminPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({dat: -1})
        res.status(200).json(posts)
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.getAdminPostById = async (req, res) => {
    try {
        await Post.findById(req.params.id).populate('comments').exec((error, post) => {
            res.json(post)
        })
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.updatePostById = async (req, res) => {
    const $set = {
        title: req.body.title,
        text: req.body.text,
    }
    try {
        const post = await Post.findOneAndUpdate({
            _id: req.params.id
        }, {$set}, {new: true })
        res.status(200).json(post)
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.deletePostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        await Comment.deleteMany({postId: req.params.id})
        await Post.deleteOne({_id: req.params.id})
        fs.unlinkSync(path.resolve(__dirname, `../static/${post.imageName}`))
        res.status(200).json({messageEn: 'Delete successfully', messageRu: 'Успешно удалено'})
    } catch (e) {
        res.status(500).json(e)
    }
}

// Basic

module.exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({dat: -1})
        res.status(200).json(posts)
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.getPostById = async (req, res) => {
    try {
        await Post.findById(req.params.id).populate('comments').exec((error, post) => {
            res.json(post)
        })
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.addView = async (req, res) => {
    const $set = {
        views: ++req.body.views
    }
    try {
        await Post.findOneAndUpdate({_id: req.params.id}, $set)
        res.status(204).json({})
    } catch (e) {
        res.status(500).json(e)
    }

}



