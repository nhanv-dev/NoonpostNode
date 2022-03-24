const express = require('express')
const router = express.Router()

const siteController = require('../app/controllers/siteController')

router.post('/signup', siteController.signup)
router.use('/login', siteController.login)
router.use('/', siteController.home)

module.exports = router
