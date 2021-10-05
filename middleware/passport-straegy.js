const { Strategy, ExtractJwt } = require('passport-jwt')
const { model } = require('mongoose')
const { JWT } = require('../keys')
const User = model('users')


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT
}

module.exports = new Strategy({},async (payload, done) => {
    try {
        const candidate = await User.findById(payload.userId).select('id')
        if (candidate) {
            done(null, candidate)
        } else {
            done(null, false)
        }
    } catch (e) {
        console.error(e)
    }
})
