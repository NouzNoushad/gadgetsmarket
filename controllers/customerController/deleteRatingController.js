const Rating = require("../../models/Rating")

const deleteRating = async (req, res) => {

    try {
        
        //find customer
        const customer = await Rating.findById(req.params.id);
        //find and remove customer
        await Rating.findOneAndRemove({ _id: req.params.id });
        req.flash('success_msg', `${customer.username} has deleted his review`);
        res.redirect(`/products/details/${customer.product}`);

    } catch (err) {
        
        console.log(err);
    }
}

module.exports = deleteRating;