const postRouter = require('./post.router');
const siteRouter = require('./site.router');

function route(app) {
    app.get('/post', postRouter)
    app.get('/', siteRouter)
}

module.exports = route
