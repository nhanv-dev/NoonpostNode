const Post = require('../models/Post')
const Categories = require('../models/Categories')
const { multipleMongooseToObject, mongooseToObject } = require('../../utils/mongoose')

class PostController {

    index(req, res, next) {
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
        await Post.find({})
            .then(async (latestPosts) => {
                _latestPosts = await multipleMongooseToObject(latestPosts)
            })
        await Post.findOne({ slug: slug })
            .then(post => {
                _post = mongooseToObject(post)
            })
            .catch(next)
        res.render('post/detail', {
            post: _post,
            latestPosts: _latestPosts,
            categories: _categories
        })
    }

    create(req, res, next) {
        res.render('post/create')
    }

    store(req, res, next) {
        const post = new Post(req.body)
        post.save()
            .then(post => {
                post = mongooseToObject(post);
                res.redirect(`post/${post.slug}`)
            })
            .catch(next)
    }

    update(req, res, next) {
        res.render('post/update')
    }
}

module.exports = new PostController