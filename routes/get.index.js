var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/home');
});

router.get('/home', function(req, res, next) {
	res.render('index', { title: 'Admin interface' });
});

router.get('/login', function(req, res, next) {
	res.render('login', {});
});

router.get('/contact', function(req, res, next) {
	res.render('contact', { title: 'Contact' });
});

router.get('/about', function(req, res, next) {
	res.render('about', { title: 'About' });
});

module.exports = router;
