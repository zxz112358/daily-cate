var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'routes/exhibitionSec/pictures/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });
var fs = require("fs");

/* GET posting new article page. */
router.get('/', function(req, res, next) {
    res.render('exhibitionSec/exhposting', {
        title: 'Posting',
        name:'Daily Cate',
        user: req.user
    });
});

router.post('/', upload.any('picture'), function (req,res,next) {
    var i = 1;
    var text = req.body.text;
    var picture = req.body.picture;

    console.log('text: ', text);
    console.log('pic: ', picture);

    for (var t in text) {
        fs.writeFile("routes/exhibitionSec/texts/" + i, t, function (error) {
            if (error){
                console.log(error);
            }
        });
        i++;
    }

});

module.exports = router;