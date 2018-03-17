var express = require('express');
var router = express.Router();

/* GET exhibition page. */
router.get('/', function(req, res, next) {
  res.render('exhibitionSec/exhibition', {
    title: 'Exhibition',
    name:'Daily Cate'
  });
});

module.exports = router;
