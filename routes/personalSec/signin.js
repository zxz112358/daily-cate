var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();

/* GET sign in page. */
router.get('/', function(req, res, next) {
    res.render('personalSec/signin', {
        title: 'Sign In',
        name: 'Daily Cate',
        message: req.flash('signup_success')
    });
});

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

// passport.use(new LocalStrategy(function (username, pasword, done) {
//         User.getUserByUsername(username, function (err, user) {
//             if(err) throw err;
//             if(!user){
//                 return done(null, false, {message: 'Unknown User'});
//             }
//
//             User.comparePassword(password, user.password, function (err, isMatch) {
//                 if (err) return done(err);
//                 if (isMatch){
//                     return done(null, user);
//                 }else {
//                     return done(null, false, {message: 'Invalid Password'});
//                 }
//             });
//         });
//     }));

router.post('/', passport.authenticate('local', {failureRedirect: '/', failureFlash: 'Invalid username or password!'}),
function(req, res){
    req.flash('success', 'You are now logged in');
    res.redirect('/');
});

module.exports = router;
