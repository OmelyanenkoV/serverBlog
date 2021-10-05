const { Strategy, ExtractJwt } = require('passport-jwt')
// const { model } = require('mongoose')
const { JWT } = require('../keys')
const User = require('../models/user.model')


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT
}

module.exports = new Strategy(options,async (payload, done) => {
    try {
        const candidate = await User.findById(payload.userId).select('id')
        if (candidate) {
            done(null, candidate)
        } else {
            done(null, false)
        }
    } catch (e) {
        console.error(e, 'e')
    }
})
