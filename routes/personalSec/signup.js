var express = require('express');
var router = express.Router();

/* GET sign up page. */
router.get('/', function(req, res, next) {
    res.render('personalSec/signup', {
        title: 'Sign Up',
        name: 'Daily Cate'
    });
});

router.post('/', function (req,res,next) {
    console.log(req.body.email);
});

// router.get('/process_get',function(req,res){
//     var response = {
//         "username":req.body.username,
//         "email":req.query.email,
//         "password":req.query.password,
//         // "description":req.query.desc
//     };
//
//     console.log(response);
//
//     res.end(JSON.stringify(response));
//
// })

module.exports = router;
