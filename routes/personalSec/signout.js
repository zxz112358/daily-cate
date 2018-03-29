var express = require('express');
var router = express.Router();

/* GET sign in page. */
router.get('/', function(req, res, next) {
    res.render('personalSec/signout', {
        title: 'Sign Out',
        name: 'Daily Cate'
    });

    req.logout();
    req.session.destroy();

    req.flash('success_msg', 'You are now logged out.');
    res.redirect('../index');
});

module.exports = router;
