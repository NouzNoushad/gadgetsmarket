const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const Auth = require('../../models/Auth');

const passportAuth = (passport) => {

    passport.use(new localStrategy({ usernameField: 'email' },
    
        (email, password, done) => {

            Auth.findOne({ email: email }, (err, user) => {
                
                if (err) return done(err);

                if (!user) {
                    
                    return done(null, false, { message: 'Invalid user' });
                }

                //bcrypt password
                bcrypt.compare(password, user.password, async (err, match) => {

                    if (err) return done(err);

                    if (match) {
                        
                        return done(null, user);

                    } else {
                        
                        return done(null, false, { message: 'Invalid password' });
                    }
                });

            })
        }
    ));

    passport.serializeUser((user, done) => {

        done(null, user.id);

    });
    passport.deserializeUser((id, done) => {

        Auth.findById(id, (err, user) => {

            done(err, user);
        });
    });
}

module.exports = passportAuth;