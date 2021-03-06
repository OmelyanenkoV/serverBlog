const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const User = require('../models/user.model')

module.exports.login = async (req, res) => {
    const candidate = await User.findOne({login: req.body.login})
    if (candidate) {
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, candidate.password)
        if (isPasswordCorrect) {
            const token = jwt.sign({
                login: candidate.login,
                userId: candidate._id
            }, keys.JWT, {expiresIn: 60 * 60})
            res.status(200).json({token})
        } else {
            res.status(404).json(
                {
                    messageEn: 'Login or password not correct',
                    messageRu: 'Логин или пароль не верны'
                }
            )
        }
    } else {
        res.status(404).json(
            {
                messageEn: 'User not found',
                messageRu: 'Пользователь не найден'
            }
        )
    }
}

module.exports.createUser = async (req, res) => {
    const candidate = await User.findOne({login: req.body.login})
    if (!candidate) {
        const user = new User({
            login: req.body.login,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
        })
        await user.save()
        res.status(201).json({user})
    } else {
        res.status(409).json(
            {
                messageEn: 'This login is used',
                messageRu: 'Этот логин уже используется'
            }
        )
    }
}
