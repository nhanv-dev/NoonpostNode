const Post = require('../models/Post')
const Categories = require('../models/Categories')
const Users = require('../models/Users')
const { multipleMongooseToObject } = require('../../utils/mongoose')
class PostController {

    async home(req, res, next) {
        Post.find({})
            .sort({ createdAt: 'desc' })
            .then(async posts => {
                posts = await posts.filter(post => {
                    post.thumbnail = getThumbnailFromContent(post.content)
                    return post
                })
                res.render('pages/home', {
                    posts: multipleMongooseToObject(posts),
                    categories: await findAllCategory()
                })
            })
            .catch(next)
    }
    async category(req, res, next) {
        Post.find({ category: req.params.slug })
            .then(async posts => {
                posts = await posts.filter(post => {
                    post.thumbnail = getThumbnailFromContent(post.content)
                    return post
                })
                res.render('pages/home', {
                    posts: multipleMongooseToObject(posts),
                    categories: await findAllCategory()
                })
            })
            .catch(next)
    }

    async hashtag(req, res, next) {
        Post.find({ "hashtag.slug": req.params.slug })
            .then(async posts => {
                res.render('pages/home', {
                    posts: multipleMongooseToObject(posts),
                    categories: await findAllCategory()
                })
            })
            .catch(next)
    }

    async author(req, res, next) {
        Post.find({ slugAuthor: req.params.slug })
            .then(async posts => {
                res.render('pages/home', {
                    posts: multipleMongooseToObject(posts),
                    categories: await findAllCategory()
                })
            })
            .catch(next)
    }

    async login(req, res, next) {
        res.render('pages/login', {
            categories: await findAllCategory()
        })
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

    async signup(req, res, next) {
        res.render('pages/signup', {
            categories: await findAllCategory()
        })
    }

}

function getThumbnailFromContent(content) {
    const defaultImage = '/images/image-do-not-exist.png'

    if (!content) return defaultImage

    let a = content.indexOf('<img')
    let b = content.indexOf('>', a) + 1
    let img = content.slice(a, b)
    a = img.indexOf('src=')
    b = img.indexOf(' ', a) + 1

    img = img.slice(a, b).slice(5, img.length - 2)
    console.log(img)
    return img || defaultImage
}

async function findAllCategory() {
    let _categories = []
    await Categories.find({})
        .then(async (categories) => {
            _categories = await multipleMongooseToObject(categories)
            _categories.forEach(async (category) => {
                await Post.count({ category: category.name })
                    .then(count => {
                        category.amount = count
                    })
                    .catch(error => console.log(error))
            })
        })
        .catch(error => console.log(error))
    return _categories;
}

module.exports = new PostController