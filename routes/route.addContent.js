var express 		= require('express');
var mongoose 		= require('mongoose');
var auth_check		= require('../custom_middleware/auth_check');
var mongoose 		= require('mongoose');

var router 			= express.Router();
var ContentsModel 	= mongoose.model('ContentsModel');

router.get('/addContent', function(req, res, next) {
	res.render('addContent', { title: 'Add content' , beaconsList: ['beacon1', 'beacon2', 'beacon3'], error: req.flash('info') });
});

router.post('/addContent', function(req, res, next) {
	console.log('ROUTE: POST /addContent');

	if (req.body.content_title !== undefined && req.body.title !== '') {
		var contentInstance = new ContentsModel({
			title: req.body.content_title,
			text: req.body.content_text,
		});

		contentInstance.save(function(err) {
			if (err) {
				console.log('error saving content into the database');
				console.warn(err);

			} else {
				console.log('new content added to the database.');

				if (req.body.submit === 'dashboard') {
					res.redirect('home');

				} else {
					console.log('')
					res.redirect('addContent');
				}
			}
		});
	} else {
		console.log('req.body.content_title is undefined or empty.');
		req.flash('info', 'Something went wrong on the server... Try again later.');
		res.redirect('addContent');
	}
});

module.exports = router;
