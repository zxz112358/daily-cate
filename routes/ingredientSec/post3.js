var express = require('express');
var router = express.Router();

/* GET exhibition page. */
router.get('/', function(req, res, next) {
    res.render('ingredientSec/post3', {
        title: 'Post 3',
        name:'Daily Cate',
        author:'XXX',
        username: req["user"]
    });
});

module.exports = router;
