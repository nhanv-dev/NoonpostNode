const Post = require('../models/Post')
const Categories = require('../models/Categories')
const Users = require('../models/Users')
const { multipleMongooseToObject } = require('../../utils/mongoose')
class PostController {

    home(req, res, next) {
        Post.find({})
            .then(posts => {
                console.log(posts)
                res.render('pages/home', {
                    posts: multipleMongooseToObject(posts)
                })
            })
            .catch(next)


    }

    login(req, res, next) {
        res.render('pages/login')
    }

    authorize(req, res, next) {
        Users.findOne({ ...req.body })
            .then(user => {
                if (user) {
                    if (req.body.remember)
                        localStorage.setItem('loggedIn', true)
                    res.redirect('/home')
                }
                else
                    res.redirect('/login')
            })
            .catch(next)
    }

    signup(req, res, next) {
        res.render('pages/signup')
    }

}

module.exports = new PostController