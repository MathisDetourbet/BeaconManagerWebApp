var express		= require('express');
var mongoose	= require('mongoose');
var auth_check	= require('../custom_middleware/auth_check');
var mongoose 	= require('mongoose');

var router 			= express.Router();
var CompaniesModel 	= mongoose.model('CompaniesModel');

router.get('/dashboard', auth_check, function(req, res, next) {
	console.log('sessionID: ' + req.session.user_id);
	
	CompaniesModel.findOne({
		users_staff: { "$in": [req.session.user_id] }

	}, function(err, company) {
		console.log('result company: ' + company);
		if (err) {
			console.warn(err);
			res.redirect('login');

		} else if (company === undefined || company === null || company === '') {
			req.flash('info', 'Session has expired. Please log in.');
			res.redirect('login');

		} else {
			res.render('dashboard', { title: 'Dashboard', company_name: company.name, company_api_token: company.api_token });
		}
	});
});

module.exports = router;