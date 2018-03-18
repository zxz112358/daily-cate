var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//-----
var session = require('express-session');
var passport = require('passport');
var expressValidator = require('express-validator');
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var flash = require('connect-flash');
var mysql = require('mysql');

var index = require('./routes/index');
var ingredient = require('./routes/ingredientSec/ingredient');
var exhibition = require('./routes/exhibitionSec/exhibition');
var asking = require('./routes/askingSec/asking');
var signup = require('./routes/personalSec/signup');
var signin = require('./routes/personalSec/signin');
var signout = require('./routes/personalSec/signout');


var app = express();


var test = require('./routes/test');
var connection = test.connection;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//-----
//Handle file uploads
var upload = multer({dest: './uploads'});
//-----

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//-----
//Handle Sessions
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value, location) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return{
            param: formParam,
            msg: msg,
            value: value
        };
    }
}))

app.use(function(req, res, next){
    res.locals.messages = require('express-messages');
    next();
})
//-----

app.use('/', index);
app.use('/ingredientSec/ingredient', ingredient);
app.use('/exhibitionSec/exhibition', exhibition);
app.use('/askingSec/asking', asking);
app.use('/personalSec/signup', signup);
app.use('/personalSec/signin', signin);
app.use('/personalSec/signout', signout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
