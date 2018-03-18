var express = require('express');
var router = express.Router();

var test = require('../test');


/* GET sign up page. */
router.get('/', function(req, res, next) {
    res.render('personalSec/signup', {
        title: 'Sign Up',
        name: 'Daily Cate',
        errors: undefined
    });
});

router.post('/', function (req,res,next) {

    //store in database
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var description = req.body.description;

    //Form validator
    req.checkBody('name', 'User name field is required').notEmpty();
    req.checkBody('email', 'Email field is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password field is required').notEmpty();
    req.checkBody('password2', 'Password do not match').equals(req.body.password);


    //Check errors
    var errors = req.validationErrors();

    if (errors){
        console.log(errors);
        res.render('personalSec/signup', {
            title: 'Sign Up',
            name: 'Daily Cate',
            errors: errors
        });
    }else {
        // TO DO: save new user to database
        test.insert_client(name,email,password,description);

        res.location('/');
        res.redirect('/');
    }
});

module.exports = router;
