var express 		= require('express'); 
var mongoose 		= require('mongoose'); 
var auth_check		= require('../custom_middleware/auth_check');
var ObjectId 		= require('mongodb').ObjectID;
var DatabaseManager = require('../database.manager.js');

var router 			= express.Router(); 
var ContentsModel 	= mongoose.model('ContentsModel'); 


// GET edit content page
router.get('/editContent/:_id', function (req, res, next) {
	ContentsModel.findOne({_id : new ObjectId(req.params._id)}, function (err,content) {

		DatabaseManager.getBeaconsListByUserID(req.session.user_id, function(err, beacons) {
			if (err) {
				console.warn(err);
				res.render('addContent', {  
					title 				: 'Add content', 
					beaconsAliasList 	: [], 
					error				: 'Something went wrong on the server... Please try again later.',
					page_name			: 'contents'
				});
			} else {
				var beaconsAliasList = [];

				for (var i = beacons.length - 1; i >= 0; i--) {
					beaconsAliasList.push(beacons[i].alias);
				}

				console.log('beaconsAliasList: ' + beaconsAliasList);

				res.render('editContent',{
					title 				: 'Edit Content', 
					content 			: content,
					id 					: req.params._id,
					beaconsAliasList	: beaconsAliasList,
					error				: undefined,
					page_name			: 'contents'
				}) 
			}
		});
		
	}); 
}); 

// PATCH content
router.post('/patchContent/:_id', function (req, res, next) {

	if ((req.body.content_title  !== undefined && req.body.content_title  !== '') &&
	   (req.body.content_text  !== undefined && req.body.content_text !== '') &&
	   (req.body.content_beacon  !== undefined && req.body.content_beacon !== '')) {

		var  content = {
			title	: req.body.content_title,
			text	: req.body.content_text,
			beacon	: [req.body.content_beacon]
		};

		ContentsModel.update({_id  : new ObjectId(req.params._id)}, {$set: content}, function (err) {
			if (!err) {
				console.log("Content edited with success id: %s", content.id);
				return res.redirect('/beaconsList'); 
			} else {
				if(err.name === 'ValidationError') {
					res.statusCode = 400;
					res.json({ 
						error: 'Validation error' 
					});
				} else {
					res.statusCode = 500;
					res.json({ 
						error: 'Server error' 
					});
				}
				console.log('Internal error(%d): %s', res.statusCode, err.message);
			}
		});

	} else {
		req.flash('info', 'Please fill out all the fields.');
		res.redirect('editContent');
	}


}); 

module.exports = router;