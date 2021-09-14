const Product = require("../../models/Product");
const File = require('../../models/File');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

//edit product
const editProduct = async (req, res) => {

    try {
        
        let errors = [];
        const product = await Product.findById(req.params.id);
        return res.render('edit', {errors, product});

    } catch (err) {
        
        console.log(err);
    }
}

// upload
const storage = multer.diskStorage({

    destination: (req, file, cb) => cb(null, 'public/uploads/'),
    filename: (req, file, cb) => {

        uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

let upload = multer({

    storage,
    limit: { fileSize: 1000000 * 5 }

}).single('myImage');

//update product
const postEditProduct = async (req, res) => {

    
    try {

        upload(req, res, async (err) => {

            const product = await Product.findById(req.params.id);

            if (err) {
                
                return res.status(500).send({ message: err.message });
            }

            if (req.file) {
                
                req.file.uuid = uuidv4();
                await File.create(req.file);

            } else {
                
                req.file = product.image;
            }

            //product updation
            const { name, price, brand, description } = req.body;

            //validations
            let errors = [];

            //check all fields
            if (!name || !price || !brand || !description || !req.file) {
                
                errors.push({ message: 'All fields are required' });
            }
            //check price is a number 
            if (!Number(price) && price) {

                errors.push({ message: 'Price should be in digits' });
            }

            //price length 1imited to 12
            if (price.length > 12) {

                errors.push({ message: 'Price should be atleast 12 digit' })
            }

            //errors
            if (errors.length > 0) {

                return res.render('edit',{errors, product});

            } else {
                
                const product = await Product.findOneAndUpdate({ _id: req.params.id }, {
                
                    $set: {

                        name: name,
                        price: price,
                        brand: brand,
                        description: description,
                        image: req.file.filename
                    }
                });

                req.flash('success_msg', `${product.name} has updated successfully`);
                return res.redirect(`/products/details/${product.id}`);

            }

        })

    } catch (err) {
        
        console.log(err);
    }
}

module.exports = {
    
    editProduct,
    postEditProduct
}