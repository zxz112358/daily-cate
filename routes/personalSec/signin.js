var express = require('express');
var router = express.Router();

/* GET sign in page. */
router.get('/', function(req, res, next) {
    res.render('personalSec/signin', {
        title: 'Sign In',
        name: 'Daily Cate'
    });
});

module.exports = router;
