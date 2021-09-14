const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const File = require('../../models/File');
const Product = require('../../models/Product');

//Get products
const createProduct = (req, res) => {

    try{

        let errors = [];
        return res.render('create', {errors: errors});

    }catch(err){

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

const postCreateProduct = (req, res) => {
    
    try {
        
        upload(req, res, async (err) => {

            let errors = [];

            //Handle files
            if (err) {
                
                res.status(500).send({ message: err.message });
            }

            if(req.file){

                //create image file
                const { filename, path, size } = req.file;
                const newFile = new File({

                    filename,
                    path,
                    size,
                    uuid: uuidv4()
                });

                //save file to database
                await newFile.save();

            }else{

                errors.push({message: 'Please upload an Image'});
            }


                //Handle product details
                const { name, price, brand, description } = req.body;

                //check all fields
                if (!name || !price || !brand || !description || !req.file){

                    errors.push({message: 'All fields are required'});
                }

                //check price is a number 
                if (!Number(price) && price){

                    errors.push({message: 'Price should be in digits'});
                }

                //price length 1imited to 12
                if (price.length > 12){

                    errors.push({message: 'Price should be atleast 12 digit'})
                }

                //errors
                if(errors.length > 0){

                    return res.render('create', {errors: errors});

                }else{

                    //save product details
                    const newProduct = new Product({

                        name,
                        price,
                        brand,
                        description,
                        image: req.file.filename,

                    });

                    //save to database
                    await newProduct.save();
                    req.flash('success_msg', `${newProduct.name} added successfully`);
                    return res.redirect('/products');
                }
            
        });

    } catch {
        
        console.log(err);

    }
}

module.exports = {

    createProduct,
    postCreateProduct
}