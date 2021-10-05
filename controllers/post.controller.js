const Post = require('../models/post.model')
// Admin
module.exports.createNewPost = async (req, res) => {
    const post =  new Post({
        title: req.body.title,
        content: req.body.text,
        imageUrl: `/${req.file.filename}`
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
        await Post.findOne(req.params.id).populate('comments').exec((error, post) => {
            res.status(200).json(post)
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
        await Post.deleteOne({_id: req.params.id})
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
        await Post.findOne(req.params.id).populate('comments').exec((error, post) => {
            res.status(200).json(post)
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



