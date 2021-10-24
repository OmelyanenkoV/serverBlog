const { Router } = require('express')
const passport = require('passport')
const upload = require('../middleware/upload')
const postController = require('../controllers/post.controller')
const router = Router()

// Admin
// /api/post
router.post(
    '/admin',
    passport.authenticate('jwt', { session: false }),
    upload.single('image'),
    postController.createNewPost
)

router.get(
    '/admin',
    passport.authenticate('jwt', { session: false }),
    postController.getAllAdminPosts
)

router.get(
    '/admin/:id',
    passport.authenticate('jwt', { session: false }),
    postController.getAdminPostById
)

router.put(
    '/admin/:id',
    passport.authenticate('jwt', { session: false }),
    postController.updatePostById
)

router.delete(
    '/admin/:id',
    passport.authenticate('jwt', { session: false }),
    postController.deletePostById
)

// Analytics
router.get(
    '/admin/get/analytics',
    passport.authenticate('jwt', { session: false }),
    postController.getAnalytics
)

// Base
// /api/post

router.get('/', postController.getAllPosts)

router.get('/:id', postController.getPostById)

router.put('/:id', postController.addView)



module.exports = router
