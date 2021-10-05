const { Router } = require('express')
const { createNewComment } = require('../controllers/comment.controller')
const router = Router()

// /api/comment
router.post('/', createNewComment)

module.exports = router
