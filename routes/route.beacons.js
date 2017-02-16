var express 		= require('express'); 
var mongoose 		= require('mongoose'); 
var auth_check		= require('../custom_middleware/auth_check');
var ObjectID 		= require('mongodb').ObjectID;
var DatabaseManager = require('../database.manager.js');

var router 			= express.Router(); 
var BeaconsModel 	= mongoose.model('BeaconsModel'); 
var ContentsModel	= mongoose.model('ContentsModel'); 

router.get('/api-beacons.json/:token', function(req, res, next) {
	var token = req.params.token; 
	DatabaseManager.getBeaconsListByToken(token, function(err, beacons) {
		if (err) {
			console.warn(err);
		} else {
			res.json(beacons);
		}
	});
});

router.get('/beacons.json', auth_check, function(req, res, next) {
	DatabaseManager.getBeaconsListByUserID(req.session.user_id, function(err, beacons) {
		if (err) {
			console.warn(err);
		} else {
			res.json(beacons);
		}
	});
});

// GET beacon list page
router.get('/beaconsList', auth_check, function (req, res, next) {
	DatabaseManager.getBeaconsListByUserID(req.session.user_id, function(err, beacons) {
		if (err) {
			console.warn(err);
			res.render('beaconsList', {
				title: "Beacons list",
				beacons: [],
				error: {
					message: 'Something went wrong on the server... Try again later.'
				}
			});

		} else {
			res.render('beaconsList', {
				title 		: 'Beacons',
				beacons 	: beacons,
				error		: undefined,
				page_name 	: 'beacons'
			});
		}
	});
}); 

router.get('/removeBeacon/:_id', function (req, res, next) {
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