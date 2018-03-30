var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();

var test = require('../test');
var connection = test.connection;

/* GET sign in page. */
router.get('/', function(req, res, next) {
    res.render('personalSec/signin', {
        title: 'Sign In',
        name: 'Daily Cate',
        message: req.flash('signup_success')
    });
});

router.post('/', passport.authenticate('local', {
    successRedirect: 'profile',
    failureRedirect: '/'
}));

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log(username);
        console.log(password);

        //check whether the username exists, if exists, return password
        // var result;
        // if (result.length === 0){
        //     return done(null, false);
        // }else if (result === password.toString()){
        //     return done(null, 'suc');
        // }

        //delete after password can be retrieved from db
        return done(null, 'suc');
    }
));

passport.serializeUser(function(user, done) {
    done(null, {
        userid: user["id"],
        username: user["username"]
    });
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});


module.exports = router;
