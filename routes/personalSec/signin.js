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
    successRedirect: 'personalSec/profile',
    failureRedirect: '/'
}));

// router.post('/', function(req, res){
//
//     var inputUsername = req.body.username;
//     var inputPassword = req.body.password;
//
//     //retrieve user id from db here
//     const username = inputUsername;
//     req.login(username, function(err){
//         res.redirect('personalSec/profile');
//     });
// });

passport.serializeUser(function(username, done) {
    done(null, username);
});

passport.deserializeUser(function(username, done) {
    done(null, username);
});


module.exports = router;
