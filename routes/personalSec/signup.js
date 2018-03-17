var express = require('express');
var router = express.Router();

/* GET sign up page. */
router.get('/', function(req, res, next) {
    res.render('personalSec/signup', {
        title: 'Sign Up',
        name: 'Daily Cate'
    });
});

module.exports = router;
