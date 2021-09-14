const Product = require("../../models/Product");
const Rating = require("../../models/Rating");

const editRating = async (req, res) => {

    try {
 
        const customer = await Rating.findById(req.params.id);
        const product = await Product.findById(customer.product);
        
        return res.render('editReview', { customer: customer, product: product });

    } catch (err) {
        
        console.log(err);
    }
}

//edit rating
const postEditRating = async (req, res) => {

    try {
        
        //find product
        const customer = await Rating.findById(req.params.id);
        //update review
        const { username, rating, message } = req.body;
        const updateRating = await Rating.findOneAndUpdate({ _id: req.params.id }, {
            
            $set: {

                username: username,
                rating: rating,
                message: message
            }
        });

        req.flash('success_msg', `${updateRating.username} has updated his reveiw`);
        return res.redirect(`/products/details/${customer.product}`);

    } catch (err) {
        
        console.log(err);
    }
}


module.exports = {

    editRating,
    postEditRating
}