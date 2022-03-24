const postRouter = require('./post');
const siteRouter = require('./site');

function route(app) {

    app.get('/post', postRouter)

    app.get('/', siteRouter)
}

module.exports = route
