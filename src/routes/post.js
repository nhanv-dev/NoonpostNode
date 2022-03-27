const express = require('express')
const router = express.Router()

const postController = require('../app/controllers/PostController')

router.use('/create', postController.create)
router.post('/store', postController.store)
router.get('/update/:slug', postController.update)
router.put('/update/:slug', postController.saveUpdate)
router.get('/:slug', postController.show)
router.use('/', postController.index)

module.exports = router
