var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');


const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt-nodejs');

var indexRouter = require('./routes/index');
var membersRouter = require('./routes/members');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'ambc@!vsmkv#!&*!#EDNAnsv#!$()_*#@',
    resave: false,
    saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('/LSFD/public/bootstrap/'));

app.use('/', indexRouter);
app.use('/member', membersRouter);

var passport = require('passport') //passport module add
  , LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
