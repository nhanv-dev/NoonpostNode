const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Post = new Schema({
    title: { type: String, required: true },
    author: { type: String, default: 'Anonymous' },
    content: { type: String, required: true },
    slug: { type: String, slug: "title", unique: true },
    slugAuthor: { type: String, slug: "author", unique: true },
    category: { type: String, required: true },
    thumbnail: { type: String, default: '/images/image-do-not-exist.png' },
    hashtag: { type: Array },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Post', Post)
