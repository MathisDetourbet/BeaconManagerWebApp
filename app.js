var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var session       = require('express-session');
var flash         = require('connect-flash');

var app = express();

var secretKey = "secretKey";


// MongoDB connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/admininterfacedatabase');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB: connection to the database failed. error:'));
db.once('open', function() {
	// here we are connected to the db
	console.log('MongoDB: connected to the database');
});

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(secretKey));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());


// Use the session middleware
app.use(session({ 
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000*60*60,
            secure: false 
          }}
  ));

// Secure cookies in production environment
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}


// Inject Data Models
require('./model/model.company');
require('./model/model.user');
require('./model/model.content');
require('./model/model.beacon');

// Setup routes
var index         = require('./routes/route.index');
var users         = require('./routes/route.users');
var companies     = require('./routes/route.companies');
var registration  = require('./routes/route.registration');
var login         = require('./routes/route.login');
var about         = require('./routes/route.about');
var contact       = require('./routes/route.contact');
var dashboard     = require('./routes/route.dashboard');
var settings      = require('./routes/route.settings');
var beacons       = require('./routes/route.beacons');
var addBeacon     = require('./routes/route.addBeacon');
var editBeacon    = require('./routes/route.editBeacon'); 
var contents      = require('./routes/route.contents');
var addContent    = require('./routes/route.addContent');


app.use('/', index);
app.use('/', users);
app.use('/', companies);
app.use('/', registration);
app.use('/', login);
app.use('/', about);
app.use('/', contact);
app.use('/', dashboard);
app.use('/', settings);
app.use('/', beacons);
app.use('/', addBeacon);
app.use('/', editBeacon); 
app.use('/', contents);
app.use('/', addContent);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Middleware for debuging
app.use(function(req, res, next) {
  var env = process.env.NODE_ENV;
  if (env === 'development') {
    console.log('ROUTE: ' + req.method.toUpperCase() + ' ' + req.path);
  }
  next();
});

// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
