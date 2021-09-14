const express = require('express');
const router = express.Router();

//product controllers
const getProducts = require('../controllers/productController/getProductController.js');
const { createProduct, postCreateProduct } = require('../controllers/productController/createProductController');
const detailsProduct = require('../controllers/productController/detailsProductController');
const { editProduct, postEditProduct } = require('../controllers/productController/editProductController');
const deleteProduct = require('../controllers/productController/deleteProductController');

//customer authentications
const { registerCustomer, postRegisterCustomer } = require('../controllers/authController/registerController');
const { loginCustomer, postLoginCustomer } = require('../controllers/authController/loginController');
const logoutCustomer = require('../controllers/authController/logoutController');
//middleware
const { loginAuth, ensureAuth } = require('../middlewares/loginAuth');

//customer rating controllers
const { customerRating, postCustomerRating } = require('../controllers/customerController/customerRatingController');
const { editRating, postEditRating } = require('../controllers/customerController/editRatingController');
const deleteRating = require('../controllers/customerController/deleteRatingController');
const { customerToken, postCustomerToken } = require('../controllers/customerController/customerTokenController');

//Products
router.get('/', getProducts);
router.get('/create', createProduct);
router.get('/details/:id', detailsProduct);
router.get('/edit/:id', editProduct);
router.get('/delete/:id', deleteProduct);

router.post('/create', postCreateProduct);
router.post('/edit/:id', postEditProduct);

//Authentications
router.get('/register', registerCustomer);
router.get('/login', loginAuth, loginCustomer);
router.get('/logout', logoutCustomer);

router.post('/register', postRegisterCustomer);
router.post('/login', postLoginCustomer);

//Customer
router.get('/rating/:id', ensureAuth, customerRating);
router.get('/token/:id', customerToken);
router.get('/editReview/:id', ensureAuth, editRating);
router.get('/deleteReview/:id', ensureAuth, deleteRating);

router.post('/rating/:id', postCustomerRating);
router.post('/token/:id', postCustomerToken);
router.post('/editReview/:id', postEditRating);

module.exports = router;