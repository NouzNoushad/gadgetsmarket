const Product = require("../../models/Product");
const Rating = require('../../models/Rating');

const customerRating = async (req, res) => {

    try {
        
        let errors = [];
        const product = await Product.findById(req.params.id);
        res.render('rating', { product: product , errors: errors});

    } catch (err) {
        
        console.log(err);
    }
    
}

// Post rating
const postCustomerRating = async (req, res) => {

    try {
        
        let errors = [];
        //validations
        const { username, rating, message} = req.body;

        //check all fields 
        if( !username || !rating || !message){

            errors.push({message: 'All fields are required'});
        }

        //check rating is number
        if(!Number(rating) && rating){

            errors.push({message: 'Rating should be in digits and between 1 - 5'});
        }

        //errors
        if(errors.length > 0){

            const product = await Product.findById(req.params.id);
            return res.render('rating', {errors: errors, product: product});

        }else{

            //save product
            req.body.product = req.params.id;
            const user = await Rating.create(req.body);
            const shortId = user.id.toString().split('').reverse().join('').slice(0, 5);
            req.flash('success_msg', `${user.username} has rated the product. 
                                        Please remember the TOKEN ID: ${shortId}`);
            return res.redirect(`/products/details/${req.params.id}`);
        }

    } catch (err) {
        
        console.log(err);
    }
}

module.exports = {
    
    customerRating,
    postCustomerRating
}