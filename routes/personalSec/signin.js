var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();

var test = require('../test');
var connection = test.connection;

/* GET sign in page. */
router.get('/', authenticationMiddleware(), function(req, res, next) {
    res.render('personalSec/signin', {
        title: 'Sign In',
        name: 'Daily Cate',
        signup_message: req.flash('signup_success'),
        signin_message: req.flash('signin_msg'),
        user: req.user
    });
});

/* Check user's authentication, if already logged in, show messages */
function authenticationMiddleware () {
    return function (req, res, next){
        if (req.isAuthenticated()){
            req.flash('signup_success', 'You are already logged in!');
        }

        return next();
    }
}

router.post('/', passport.authenticate('local', {
    successRedirect: 'profile',
    failureRedirect: '/'
}));

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log(username);
        console.log(password);

        test.select_user(username,function(result){
            if(result===false){
                console.log("user name does not exist.");
            }
            else{
                console.log(result.username);
                console.log(result.email);
                console.log(result.password);

                if (result.password === password){
                    return done(null, result);
                } else {
                    req.flash('signin_msg', 'Sign in failed.');
                    return done(null,false);
                }
            }
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, {
        username: user.username,
        email: user.email,
        description: user.description
    });
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});


module.exports = router;
