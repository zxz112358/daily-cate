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
        message: req.flash('signup_success')
    });
});

/* Check user's authentication, if already logged in, show messages */
function authenticationMiddleware () {
    return function (req, res, next){
        console.log(req.session.passport.user);

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

        //check whether the username exists, if exists, return password
        var result = test.testing();
        // var result;
        // if (result.length === 0){
        //     return done(null, false);
        // }else if (result === password.toString()){
        //     return done(null, 'suc');
        // }

        //delete after password can be retrieved from db
        return done(null, username);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});


module.exports = router;
