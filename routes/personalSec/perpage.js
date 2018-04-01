var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('personalSec/perpage', {
        title: 'Home',
        name:'Daily Cate'
    });
});

module.exports = router;
console.log("this is the personal page!");