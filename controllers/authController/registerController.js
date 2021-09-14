const Auth = require('../../models/Auth');
const bcrypt = require('bcrypt')

const registerCustomer = (req, res) => {

    try {
        
        let errors = [];
        return res.render('register', { errors });

    } catch (err) {
        
        console.log(err);
    }
}

const postRegisterCustomer = async (req, res) => {

    try {
        
        let errors = [];
        //validation
        const { name, email, password, confirmPassword } = req.body;
        
        //check all fields
        if (!name || !email || !password || !confirmPassword) {
            
            errors.push({ message: 'All fields are required' });
        }

        //check password match
        if (password !== confirmPassword) {
            
            errors.push({ message: 'Password doesnot match. Please try once again' });
        }
        
        //password length limited to 10 characters
        if (password.length > 10) {
            
            errors.push({ message: 'Password should atleast 10 characters' });
        }

        //errors exist
        if (errors.length > 0) {
            
            return res.render('register', { errors });
            
        } else {
            
            //check user exist
            const user = await Auth.findOne({ email: email });
            if (user) {
                
                errors.push({ message: 'User already exists' });
                return res.render('register', { errors });

            } else {
                
                //create new user
                const newUser = new Auth({

                    name,
                    email,
                    password
                });

                //secure password
                bcrypt.genSalt(10, (err, salt) => {

                    bcrypt.hash(newUser.password, salt, async (err, hash) => {

                        if (err) throw err;

                        //hash password
                        newUser.password = hash;

                        //save user
                        await newUser.save();
                        req.flash('success_msg', 'You are siggned In and please log In');
                        return res.redirect('/products/login');

                    });
                })
            }

        }

    } catch (err) {
        
        console.log(err);
    }
}

module.exports = {

    registerCustomer,
    postRegisterCustomer
}