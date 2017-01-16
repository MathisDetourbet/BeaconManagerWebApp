var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();


// mongoDB connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/admininterfacedatabase');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB: connection to the database failed. error:'));
db.once('open', function() {
	// here we are connected to the db
	console.log('MongoDB: connected to the database');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Inject Data Models
require('./model/model.company');
require('./model/model.user');

// setup routes
var index         = require('./routes/get.index');
var users         = require('./routes/get.users');
var companies     = require('./routes/get.companies');
var registration  = require('./routes/post.registration');
var login         = require('./routes/post.login');

app.use('/', index);
app.use('/', users);
app.use('/', companies);
app.use('/', registration);
app.use('/', login);

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
