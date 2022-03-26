const express = require('express')
const router = express.Router()

const siteController = require('../app/controllers/SiteController')

router.use('/signup', siteController.signup)
router.get('/login', siteController.login)
router.post('/login', siteController.authorize)
router.use('/', siteController.home)

module.exports = router
