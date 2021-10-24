const {model, Schema} = require('mongoose')

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    views: {
        type: "Number",
        default: 0
    },
    imageUrl: {
        type: String,
        required: true
    },
    imageName: {
        type: String,
        required: true
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comments'
        }
    ]
})

module.exports = model('posts', postSchema)
