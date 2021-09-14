const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport')

dotenv.config({ path: './config/.env' });

//mongoose connection
const connectDB = require('./config/conn');
connectDB();

//passport
require('./middlewares/auth/passportAuth')(passport);

const productsRoute = require('./routes/product');

const app = express();

const PORT = process.env.PORT | 4000;

//ejs engine
app.set('view engine', 'ejs');

//middlewares
app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV == "production") {
    
    //static files
    app.use(express.static('public'));
}

//session
app.use(session({
    secret: 'secretKey',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

//flash
app.use(flash());

//Global vars
app.use((req, res, next) => {

    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
})

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/products', productsRoute);

app.listen(PORT, () => console.log(`Server running on port, http://localhost:${PORT}`));
