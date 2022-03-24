class PostController {
    home(req, res, next) {
        res.render('pages/home')
    }
    login(req, res, next) {
        res.render('pages/login')
    }
    signup(req, res, next) {
        res.render('pages/signup')
    }

}

module.exports = new PostController