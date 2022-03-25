const express = require('express')
const router = express.Router()

const siteController = require('../app/controllers/SiteController')

router.use('/signup', siteController.signup)
router.use('/login', siteController.login)
router.use('/', siteController.home)

module.exports = router
