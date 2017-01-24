var express 		= require('express');
var mongoose 		= require('mongoose');
var auth_check		= require('../custom_middleware/auth_check');
var DatabaseManager = require('../database.manager.js');
var mongoose 		= require('mongoose');

var router 			= express.Router();
var ContentsModel 	= mongoose.model('ContentsModel');
var CompaniesModel	= mongoose.model('CompaniesModel');

router.get('/addContent', auth_check, function(req, res, next) {
	
	DatabaseManager.getBeaconsListByUserID(req.session.user_id, function(err, beacons) {
		if (err) {
			console.warn(err);
			res.render('addContent', {  
				title 				: 'Add content', 
				beaconsAliasList 	: [], 
				error				: 'Something went wrong on the server... Please try again later.' 
			});
		} else {
			var beaconsAliasList = [];

			for (var i = beacons.length - 1; i >= 0; i--) {
				beaconsAliasList.push(beacons[i].alias);
			}

			console.log('beaconsAliasList: ' + beaconsAliasList);

			res.render('addContent', {  
				title 				: 'Add content', 
				beaconsAliasList 	: beaconsAliasList,
				error				: undefined
			});
		}
	});
});

router.post('/addContent', auth_check, function(req, res, next) {
	console.log('ROUTE: POST /addContent');
	console.log('content_title: ' + req.body.content_title);

	if (req.body.content_title !== undefined && req.body.content_title !== '') {

		DatabaseManager.getCompanyByUserID(req.session.user_id, function(err, company) {
			if (err) {
				console.warn(err);
				req.flash('info', "Something went wrong on the server... Please try again later.");
				res.redirect('dashboard');

			} else {
				var contentInstance = new ContentsModel({
					title 	: req.body.content_title,
					text 	: req.body.content_text,
					beacon 	: [req.body.content_beacon], 
					company : company
				});

				console.log('contentInstance: ' + contentInstance);

				contentInstance.save(function(err) {
					if (err) {
						console.log('error saving content into the database');
						console.warn(err);

					} else {
						console.log('new content added to the database.');

						if (req.body.submit === 'dashboard') {
							// submit & quit
							res.redirect('contentsList');

						} else {
							// submit & add another content
							res.redirect('addContent');
						}
					}
				});
			}
		});

	} else {
		console.log('req.body.content_title is undefined or empty.');
		req.flash('info', 'Field "title" is required.');
		res.redirect('addContent');
	}
});

module.exports = router;
