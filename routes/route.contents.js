var express 		= require('express');
var mongoose 		= require('mongoose');
var auth_check		= require('../custom_middleware/auth_check');
var mongoose 		= require('mongoose');
var DatabaseManager = require('../database.manager.js');

var router 			= express.Router();
var ContentsModel 	= mongoose.model('ContentsModel');
var CompaniesModel	= mongoose.model('CompaniesModel');
var BeaconsModel	= mongoose.model('BeaconsModel');

router.get('/contents.json', auth_check, function(req, res, next) {
	
	DatabaseManager.getContentsListByUserID(req.session.user_id, function(err, contents) {
		if (err) {
			console.warn(err);
		} else {
			res.json(contents);
		}
	});
});

router.get('/contentsList', auth_check, function(req, res, next) {
	
	DatabaseManager.getContentsListByUserID(req.session.user_id, function(err, contents) {
		if (err) {
			console.warn(err);
			res.render('contentsList', {  
				title 	: 'Contents list', 
				contents: [], 
				error	: 'Something went wrong on the server... Please try again later.'
			});

		} else {
			res.render('contentsList',  {
				title	: 'Contents list',
				contents: contents,
				error   : '' 
			});
		}
	});
});


router.get('/removeContent/:_id', function (req, res, next) {
	BeaconsModel.remove({_id: new ObjectID(req.params._id)}, function (err, result) {
        if (!err) {
        	res.redirect('/beaconsList');
        } else {
        	console.log(err);
            throw err;
        }
        
    });
});


module.exports = router;