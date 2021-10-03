const {model, Schema} = require('mongoose')

const userSchema = new Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    }
})

module.exports = model('users', userSchema)
