const { Router } = require('express')
const { login, createUser } = require('../controllers/auth.controller')
const router = Router()

// /api/auth/admin/login
router.post('/admin/login', login)

// /api/auth/admin/createUser
router.post('/admin/createUser', createUser)



module.exports = router
