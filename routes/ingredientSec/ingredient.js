var express = require('express');
var router = express.Router();

/* GET ingredient page. */
router.get('/', function(req, res, next) {
  res.render('ingredientSec/ingredient', {
    title: 'Ingredients',
    name: 'Daily Cate'
  });
});

module.exports = router;
