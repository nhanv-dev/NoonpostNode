const Post = require('../models/Post')
const Categories = require('../models/Categories')
const { getThumbnailFromContent } = require('../../utils/tools')
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
                        .catch(() => { })
                })
            })
            .catch(() => { })
        await Post.find({}).sort({ createdAt: 'desc' }).limit(5)
            .then(async (latestPosts) => {
                latestPosts = await latestPosts.filter(post => {
                    post.thumbnail = getThumbnailFromContent(post.content)
                    return post
                })
                _latestPosts = await multipleMongooseToObject(latestPosts)
            })
        await Post.findOne({ slug: slug })
            .then(async (post) => {
                post.hashtag = post.hashtag.filter(hashtag => (hashtag !== null))
                _post = await mongooseToObject(post)
            })
            .catch(() => { })
        if (_post) _post.thumbnail = getThumbnailFromContent(_post?.content)
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
        req.body.hashtag = req.body.hashtag.split('#')
        req.body.hashtag = req.body.hashtag.map(tag => {
            if (!tag) {
                return {
                    name: tag,
                    slug: tag.toLowerCase().trim().replace(/ /g, '-').replace(/[^\w-]+/g, '')
                }
            }
        })
        const post = new Post(req.body)
        post.save()
            .then(post => {
                post = mongooseToObject(post);
                res.redirect(`post/${post.slug}`)
            })
            .catch(next)
    }

    async update(req, res, next) {
        let _categories
        await Categories.find({})
            .then(async (categories) => {
                _categories = await multipleMongooseToObject(categories)
            })
            .catch(next)

        await Post.findOne({ slug: req.params.slug })
            .then(async (post) => {
                res.render('post/update', {
                    post: mongooseToObject(post),
                    categories: _categories
                })
            })
            .catch(next)
    }
    async saveUpdate(req, res, next) {
        req.body.hashtag = req.body.hashtag.split('#')
        req.body.hashtag = req.body.hashtag.map(tag => {
            if (!tag) {
                return {
                    name: tag,
                    slug: tag.toLowerCase().trim().replace(/ /g, '-').replace(/[^\w-]+/g, '')
                }
            }
        })
        await Post.findOneAndUpdate({ _id: req.params.slug }, req.body)
            .then((post) => {
                res.redirect(`/post/${post.slug}`)
            })
            .catch(next)
    }


}



module.exports = new PostController