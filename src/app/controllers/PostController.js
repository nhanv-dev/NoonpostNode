const Post = require('../models/Post')
const Categories = require('../models/Categories')
const { multipleMongooseToObject, mongooseToObject } = require('../../utils/mongoose')

class PostController {

    async index(req, res, next) {
        res.redirect('/')
    }

    async show(req, res, next) {
        const slug = req.params.slug
        if (!slug) res.redirect('/')
        let _post, _latestPosts, _categories
        await Categories.find({})
            .then(async (categories) => {
                _categories = await multipleMongooseToObject(categories)
                _categories.forEach(async (category) => {
                    await Post.count({ category: category.name })
                        .then(count => {
                            category.amount = count
                        })
                        .catch(next)
                })
            })
            .catch(next)
        await Post.find({}).sort({ createdAt: 'desc' }).limit(5)
            .then(async (latestPosts) => {
                _latestPosts = await multipleMongooseToObject(latestPosts)
            })
        await Post.findOne({ slug: slug })
            .then(async (post) => {
                _post = await mongooseToObject(post)
            })
            .catch(next)
        res.render('post/detail', {
            post: _post,
            latestPosts: _latestPosts,
            categories: _categories
        })
    }

    async create(req, res, next) {
        let _categories
        await Categories.find({})
            .then(async (categories) => {
                _categories = await multipleMongooseToObject(categories)
            })
            .catch(next)
        res.render('post/create', {
            categories: _categories
        })
    }

    async store(req, res, next) {
        req.body.hashtag = req.body.hashtag.split(' ')
        const post = new Post(req.body)
        post.save()
            .then(post => {
                post = mongooseToObject(post);
                res.redirect(`post/${post.slug}`)
            })
            .catch(next)
    }

    async update(req, res, next) {
        res.render('post/update')
    }
}

module.exports = new PostController