var express 		= require('express');
var mongoose 		= require('mongoose');
var auth_check		= require('../custom_middleware/auth_check');
var mongoose 		= require('mongoose');
var ObjectId 		= require('mongodb').ObjectID; 
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

			var beaconsAliasList = [];
			console.log("-------CONTENT-------",contents); 
			
			if(contents.beacon !== undefined && contents.beacon !== ''){

				for (var i = 0; i < contents.beacon.length; i++) {
					BeaconsModel.findOne({_id : new ObjectId(contents.beacon[i])}, function (err,beacon){
						if(!err){
							beaconsAliasList.push(beacon.alias); 
						}
					});
				};
				res.render('contentsList',  {
					title				: 'Contents list',
					contents 			: contents,
					beaconsAliasList	: beaconsAliasList, 
					error   			: undefined 
				});
			} else{
				res.render('contentsList',  {
					title				: 'Contents list',
					contents 			: contents,
					beaconsAliasList	: [], 


					error   			: undefined 
				});
			}
			
			
			
		}
	});
});

module.exports = router;