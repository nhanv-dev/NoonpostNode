const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Categories = new Schema({
    name: { type: String },
    amount: { type: Number, default: 0 },
    slug: { type: String, slug: 'name', unique: true },
})

module.exports = mongoose.model('Categories', Categories)
