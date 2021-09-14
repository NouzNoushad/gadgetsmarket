const loginAuth = (req, res, next) => {

    if (req.isAuthenticated()) {
        
        return res.redirect('/products');
    }

    return next();
}

const ensureAuth = (req, res, next) => {

    if (req.isAuthenticated()) {
        
        return next();
    }

    return res.redirect('/products/login');
}

module.exports = {

    loginAuth,
    ensureAuth
}