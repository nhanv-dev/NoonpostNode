const express = require('express')
const router = express.Router()

const postController = require('../app/controllers/PostController')

router.use('/create', postController.create)
router.post('/store', postController.store)
router.use('/update', postController.update)
router.use('/:slug', postController.show)

module.exports = router
