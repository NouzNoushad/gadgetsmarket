const Product = require('../../models/Product');

const getProducts =  async (req, res) => {

    try {

        const products = await Product.find();
        return res.render('products', { products: products });

    } catch (err) {
        
        console.log(err);
    }
}

module.exports = getProducts;