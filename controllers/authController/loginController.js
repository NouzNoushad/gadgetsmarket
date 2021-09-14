const passport = require('passport');

const loginCustomer = (req, res) => {

    try {
        
        return res.render('login');

    } catch (err) {
        
        console.log(err);
    }
}

const postLoginCustomer = passport.authenticate('local', {

    successRedirect: '/products',
    failureRedirect: '/products/login'

});

module.exports = {

    loginCustomer,
    postLoginCustomer
}