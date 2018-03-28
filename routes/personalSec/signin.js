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




// passport.use(new LocalStrategy(function (username, password, done) {
//         getUserByUsername(username, function (err, user) {
//             if(err) throw err;
//             if(!user){
//                 return done(null, false, {message: 'Unknown User'});
//             }
//
//             comparePassword(password, userPassword, function (err, isMatch) {
//                 if (err) return done(err);
//                 if (isMatch){
//                     return done(null, user);
//                 }else {
//                     return done(null, false, {message: 'Invalid Password'});
//                 }
//             });
//         });
//     }));

router.post('/', function(req, res){

    var inputUsername = req.body.username;
    var inputPassword = req.body.password;

    //retrieve user id from db here
    const username = inputUsername;
    req.login(username, function(err){
        res.redirect('/');
    });
});

passport.serializeUser(function(username, done) {
    done(null, username);
});

passport.deserializeUser(function(username, done) {
    done(null, username);
});


module.exports = router;
