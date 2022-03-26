const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Users = new Schema({
    userName: { type: String, unique: true },
    Email: { type: String },
    password: { type: String },
    slug: { type: String, slug: 'userName', unique: true },

})

module.exports = mongoose.model('Users', Users)
