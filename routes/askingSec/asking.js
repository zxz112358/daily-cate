var express = require('express');
var router = express.Router();

/* GET asking page. */

router.get('/', function(req, res, next) {
  res.render('askingSec/asking', {
    title: 'Help',
    name:'Daily Cate'
  });
});

module.exports = router;
console.log("this is the asking page!");