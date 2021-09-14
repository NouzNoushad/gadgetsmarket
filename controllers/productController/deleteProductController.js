const Product = require('../../models/Product');

const deleteProduct = async (req, res) => {

    try{

        const product = await Product.findOneAndRemove({ _id: req.params.id });
        req.flash('success_msg', `${product.name} deleted successfully`);
        return res.redirect('/products');

    }catch(err){

        console.log(err);
    }
}

module.exports = deleteProduct;