var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'routes/exhibitionSec/pictures/');
    },
    filename: function (req, file, cb) {
        cb(null, String(req.files.length));
    }
});
var upload = multer({ storage: storage });
var fs = require("fs");
var aio = require('array-indexof-object');

var test = require('../test');

/* GET posting new article page. */
router.get('/', function(req, res, next) {
    res.render('exhibitionSec/exhposting', {
        title: 'Posting',
        name:'Daily Cate',
        user: req.user
    });
});

router.post('/', upload.any('picture'), function (req,res,next) {
    var text = (typeof (req.body.text) == "string") ? [req.body.text]: req.body.text;
    var picture = req.files;
    var title = req.body.title;

    console.log('title: ', title);
    console.log('text: ', text);
    console.log('pic: ', picture);

    //var i = test.count_paragraph_no(function(result){result++;});
    //test.count_picture_no(function (){})

    test.count_paragraph_no(function(result){
        for (var j = 0; j < text.length; j++) {
            console.log(text[j]);
            fs.writeFile("routes/exhibitionSec/texts/" + (result + j + 1), text[j], function (error) {
                if (error){
                    console.log(error);
                }
            });
        }
    });

});

module.exports = router;