var express		= require('express');
var mongoose 	= require('mongoose');
var bcrypt      = require('bcrypt-nodejs');

var router 		= express.Router();
var UsersModel 	= mongoose.model('UsersModel');

router.get('/login', function(req, res, next) {
	res.render('login', { error: { message: req.flash('info') } });
});

router.post('/login', function(req, res, next) {
	var post = req.body;
	
	UsersModel.findOne({
		email: post.email

	}, function(err, user) {
		if (err) {
			console.warn(err);
			req.flash('info', 'Something went wrong on the server... Try again later.');
			res.redirect('login');

		} else if (user === undefined || user === [] || user === '') {
			// not user found with the email given in the request body
			// return 'bad email or password' to the user

		} else {
			// user found in database with email given in the request body
			// now we need to check the password
			var givenPassword = req.body.password;
			var rightPassword = user.password;

			if (bcrypt.compareSync(givenPassword, rightPassword)) {
				// right password
				// log the user in
				req.session.user_id = user._id;
				res.redirect('/dashboard');
			} else {
				// bad password
				// return 'bad email or password' to the user
				req.flash('info', 'Bad email or password.');
				res.redirect('login');
			}
		}
	});
});

router.get('/logout', function(req, res, next) {
	delete req.session.user_id;
	res.redirect('/login');
});

module.exports = router;