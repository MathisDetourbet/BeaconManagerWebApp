var express 	= require('express'); 
var mongoose 	= require('mongoose'); 
var auth_check	= require('../custom_middleware/auth_check');
var ObjectId 	= require('mongodb').ObjectID;

var router 			= express.Router(); 
var BeaconsModel 	= mongoose.model('BeaconsModel'); 


// GET edit beacon page
router.get('/editBeacon/:_id', function (req, res, next) {
	console.log('ROUTE : GET /addBeacon'); 

	Beacon.findOne({_id : new ObjectId(req.params._id)}, function (err,beacon))
	res.render('editBeacon',{
		title 	: 'Add New Beacon', 
		beacon 	: beacon,
		error 	: {
			message: req.flash('info')
		}
	})
}); 

// PATCH /addBeacon page
router.patch('/editBeacon/:_id', function (req, res, next) {
	console.log('ROUTE : PATCH /editBeacon'); 

	var  beacon = new BeaconsModel({
		uuid	: req.body.uuid,
		major	: req.body.major,
		minor	: req.body.minor, 
		alias 	: req.body.alias
	}); 

	beacon.patch({_id  : new ObjectId(_id)}, {$set: beacon},function (err) {
		if (!err) {
			console.log("Beacon edited with success id: %s", beacon.id);
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


}); 

module.exports = router;