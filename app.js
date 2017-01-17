var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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


// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new LocalStrategy({
    email: 'email',
    password: 'password',
    session: true
  },
  function(email, password, done) {
    db.UsersModel.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// session.
app.use(passport.initialize());
app.use(passport.session());


// Inject Data Models
require('./model/model.company');
require('./model/model.user');

// setup routes
var index         = require('./routes/route.index');
var users         = require('./routes/route.users');
var companies     = require('./routes/route.companies');
var registration  = require('./routes/route.registration');
var login         = require('./routes/route.login');
var about         = require('./routes/route.about');
var contact       = require('./routes/route.contact');

app.use('/', index);
app.use('/', users);
app.use('/', companies);
app.use('/', registration);
app.use('/', login);
app.use('/', about);
app.use('/', contact);

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
