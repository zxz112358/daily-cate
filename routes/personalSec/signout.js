var express = require('express');
var router = express.Router();

/* GET sign in page. */
router.get('/', function(req, res, next) {
    res.render('personalSec/signout', {
        title: 'Sign Out',
        name: 'Daily Cate'
    });
});

module.exports = router;