var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('personalSec/userpostpage', {
        title: 'Home',
        name:'Daily Cate'
    });
});

module.exports = router;
console.log("this is the other user's post page!");