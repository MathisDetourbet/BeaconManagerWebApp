var express = require('express');
var router = express.Router();

var mongoose 		= require('mongoose');
var CompaniesModel 	= mongoose.model('CompaniesModel');

/* GET users listing. */
router.get('/companies.json', function(req, res, next) {

	CompaniesModel.find({}, function(err, companies) {
		res.json(companies);
	});
});

module.exports = router;
