var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('personalSec/myfollower', {
        title: 'Home',
        name:'Daily Cate'
    });
});

module.exports = router;
console.log("this is the follower page!");