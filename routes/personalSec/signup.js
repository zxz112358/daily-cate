var express = require('express');
var router = express.Router();

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

    //only for validation
    var password2 = req.body.password2;

    //Form validator
    req.checkBody('name', 'Name field is required').notEmpty();
    req.checkBody('email', 'Email field is required').notEmpty();
    req.checkBody('email', 'Email is invalid').isEmail();
    req.checkBody('username', 'Username field is required').notEmpty();
    req.checkBody('password', 'Password field is required').notEmpty();
    req.checkBody('password2', 'Password do not match').equals(req.body.password);


    //Check errors
    var errors = req.validationErrors();

    if (errors){
        res.render('personalSec/signup', {
            title: 'Sign Up',
            name: 'Daily Cate',
            errors: errors
        });
    }else{
        console.log('no errors')
    }
});

module.exports = router;
