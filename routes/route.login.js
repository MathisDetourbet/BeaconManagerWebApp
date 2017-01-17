var express		= require('express');
var router 		= express.Router();
var passport 	= require('passport');

router.get('/login', function(req, res, next) {
	res.render('login', {});
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
	function(req, res) {
		console.log('ROUTES: POST /login');
		res.redirect('/');
	});

module.exports = router;