const express = require('express')
const router = express.Router()

const siteController = require('../app/controllers/SiteController')

router.get('/signup', siteController.signup)
router.get('/login', siteController.login)
router.post('/login', siteController.authorize)
router.get('/category/:slug', siteController.category)
router.get('/hashtag/:slug', siteController.hashtag)
router.get('/author/:slug', siteController.author)
router.get('/home', siteController.home)
router.get('/', siteController.home)

module.exports = router
