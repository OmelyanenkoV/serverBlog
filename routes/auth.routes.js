const { Router } = require('express')
const passport = require("passport");
const { login, createUser } = require('../controllers/auth.controller')
const router = Router()

// /api/auth/admin/login
router.post('/admin/login', login)

// /api/auth/admin/createUser
router.post(
    '/admin/createUser',
    passport.authenticate('jwt', { session: false }),
    createUser
)



module.exports = router
