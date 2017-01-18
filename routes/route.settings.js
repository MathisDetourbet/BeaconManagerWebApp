var express 		= require('express');
var auth_check		= require('../custom_middleware/auth_check');
var mongoose		= require('mongoose');

var router 			= express.Router();
var CompaniesModel 	= mongoose.model('CompaniesModel');

router.get('/settings', auth_check, function(req, res, next) {

	CompaniesModel.findOne({
		

	}, function(err, company) {
		if (err) {

		} else if (!err) {

		} else {

			res.render('settings', { title: 'Settings', api_key: company.api_key });
		}
	});
});

module.exports = router;