const express = require('express')
const router = express.Router()

const postController = require('../app/controllers/PostController')

router.use('/:slug', postController.show)
router.use('/', postController.index)
router.use('/creates', postController.create)
router.post('/store', postController.store)
router.use('/update', postController.update)

module.exports = router
