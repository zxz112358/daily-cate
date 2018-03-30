var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('homepage/homepage', {
        title: 'Home',
        name:'Daily Cate',
        username: req.user.username
    });
});

module.exports = router;
console.log("this is the home page!");