var express 		= require('express'); 
var mongoose 		= require('mongoose'); 
var auth_check		= require('../custom_middleware/auth_check');
var DatabaseManager = require('../database.manager.js');

var router 			= express.Router(); 
var BeaconsModel 	= mongoose.model('BeaconsModel'); 
var CompaniesModel	= mongoose.model('CompaniesModel');


// GET add new beacon page
router.get('/addBeacon', auth_check, function (req, res, next) {
	console.log('ROUTES : GET /addBeacon'); 
	
	res.render('addBeacon',{
		title : 'Add New Beacon', 
		error : {
			message: req.flash('info')
		}
	})
}); 

// POST /addBeacon page
router.post('/addBeacon', auth_check, function (req, res, next) {
	console.log('ROUTES : POST /addBeacon');

	if ((req.body.uuid  !== undefined && req.body.uuid  !== '') &&
	   (req.body.major  !== undefined && req.body.major !== '') &&
	   (req.body.minor  !== undefined && req.body.minor !== '') && 
	   (req.body.alias  !== undefined && req.body.alias !== '')) {

	   	if ((/^\d+$/.test(req.body.major)) && (/^\d+$/.test(req.body.minor))) {

	   		DatabaseManager.getCompanyByUserID(req.session.user_id, function(err, company) {
				if (err) {
					console.warn(err);
					req.flash('info', "Something went wrong on the server... Please try again later.");
					res.redirect('addBeacon');

				} else {
					var  beacon = new BeaconsModel({
						uuid	: req.body.uuid,
						major	: Number(req.body.major),
						minor	: Number(req.body.minor), 
						alias 	: req.body.alias,
						company	: company
					}); 

					beacon.save(function (err) {
						if (!err) {
							console.log("New beacon created with id: %s", beacon.id);
							res.redirect('/beaconsList');

						} else {
							if (err.name === 'ValidationError') {
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
				}
		});

	   	} else {
	   		req.flash('info', 'Major and minor fields have to be a number.');
			res.redirect('addBeacon');
	   	}

	} else {
		req.flash('info', 'Please fill out all the fields.');
		res.redirect('addBeacon');
	}
}); 

module.exports = router;