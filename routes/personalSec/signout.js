var express = require('express');
var router = express.Router();

/* GET sign in page. */
router.get('/', function(req, res, next) {
    res.render('personalSec/signout', {
        title: 'Sign Out',
        name: 'Daily Cate',
        message:'You are now logged out.',
        username: req["user"]
    });

    req.logout();


    req.session.destroy(function () {
        //res.clearCookie('connect.sid');
    });


});

module.exports = router;
