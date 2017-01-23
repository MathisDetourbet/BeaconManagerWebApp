var express			= require('express');
var mongoose		= require('mongoose');
var auth_check		= require('../custom_middleware/auth_check');
var DatabaseManager = require('../database.manager.js');
var mongoose 		= require('mongoose');

var router 			= express.Router();
var CompaniesModel 	= mongoose.model('CompaniesModel');

router.get('/dashboard', auth_check, function(req, res, next) {
	
	DatabaseManager.getCompanyByUserID(req.session.user_id, function(err, company) {
		if (err) {
			req.flash('info', 'Session has expired. Please log in.');
			res.redirect('login');

		} else {
			console.log('company found: ' + company);
			res.render('dashboard', { 
				title				: 'Dashboard', 
				company_name		: company.name, 
				company_api_token	: company.api_token 
			});
		}
	});
});

module.exports = router;