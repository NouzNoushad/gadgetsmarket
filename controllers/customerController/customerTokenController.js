const Rating = require('../../models/Rating');

const customerToken = async (req, res) => {

    try {
        
        let errors = [];
        const customer = await Rating.findById(req.params.id);
        res.render('token', {customer, errors});

    } catch {
        
        console.log(err);
    }
}

const postCustomerToken = async (req, res, next) => {

    try {
        
        let errors = [];
        const customer = await Rating.findById(req.params.id);
        const shortId = customer.id.toString().split('').reverse().join('').slice(0, 5);
        const { token } = req.body;

        //empty token
        if (!token) {

            errors.push({ message: 'Please provide a token id' });
        }
        //token id limited to 5 characters
        if (token.length > 5) {
            
            errors.push({ message: 'Token Id should be atleast 5 characters' });
        }

        //errors
        if (errors.length > 0) {
            
            return res.render('token', { errors, customer });

        } else {
            
            if (token == shortId) {
        
                return res.redirect(`/products/editReview/${req.params.id}`);
            }
            req.flash('error_msg', 'Incorrect token id. only valid customer is allowed');
            return res.redirect(`/products/details/${customer.product}`);
        }

    } catch (err) {
        
        console.log(err);
    }
}

module.exports = {

    customerToken,
    postCustomerToken
}
