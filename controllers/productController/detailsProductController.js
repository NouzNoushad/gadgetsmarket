const Product = require("../../models/Product");
const Rating = require("../../models/Rating");

const detailsProduct = async (req, res) => {

    try {
    
        let totalRating = 0;
        const ratings = await Rating.find().sort({ date: 'desc' });
        const product = await Product.findById(req.params.id);

        //filter users by product id and find average rating
        const userRatings = ratings.filter(rating => rating.product == req.params.id);
        const rating = userRatings.map(rating => rating.rating);
        const sumRating = rating.reduce((acc, curr) => {

            totalRating++;
            return acc + curr;

        }, totalRating);
        let averageRating = (sumRating / totalRating).toString().slice(0, 3);
        if (isNaN(averageRating)) {
            
            product.rating = 5;
            averageRating = 5;

        } else {
            
            product.rating = averageRating;
        }
        await product.save();
        return res.render('details', { product: product, ratings: ratings, averageRating: averageRating , customers: totalRating});

    } catch (err) {
        
        console.log(err);
    }
}

module.exports = detailsProduct;