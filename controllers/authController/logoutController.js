const logoutCustomer = (req, res) => {

    try {
        
        req.logout();
        req.flash('success_msg', 'You are logged out');
        return res.redirect('/products');

    } catch (err) {
        
        console.log(err);
    }
}

module.exports = logoutCustomer;