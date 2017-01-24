var express 	= require('express'); 
var mongoose 	= require('mongoose'); 
var auth_check	= require('../custom_middleware/auth_check');
var ObjectId 	= require('mongodb').ObjectID;

var router 			= express.Router(); 
var BeaconsModel 	= mongoose.model('BeaconsModel'); 


// GET edit beacon page
router.get('/editBeacon/:_id', function (req, res, next) {
	BeaconsModel.findOne({_id : new ObjectId(req.params._id)}, function (err,beacon){
		res.render('editBeacon',{
			title 	: 'Edit Beacon', 
			beacon 	: beacon,
			id		: req.params._id,
			error 	: {
				message: req.flash('info')
			}
		}) 
	}); 
}); 

// PATCH /addBeacon page
router.post('/editBeacon/:_id/patch', function (req, res, next) {

	if ((req.body.uuid  !== undefined && req.body.uuid  !== '') &&
	   (req.body.major  !== undefined && req.body.major !== '') &&
	   (req.body.minor  !== undefined && req.body.minor !== '') && 
	   (req.body.alias  !== undefined && req.body.alias !== '')) {

	   	if ((/^\d+$/.test(req.body.major)) && (/^\d+$/.test(req.body.minor))) {

			var  beacon = {
				uuid	: req.body.uuid,
				major	: Number(req.body.major),
				minor	: Number(req.body.minor), 
				alias 	: req.body.alias
			};

			BeaconsModel.update({_id  : new ObjectId(req.params._id)}, {$set: beacon}, function (err) {
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

	   	} else {
	   		req.flash('info', 'Major and minor fields have to be a number.');
			res.redirect('editBeacon');
	   	}

	} else {
		req.flash('info', 'Please fill out all the fields.');
		res.redirect('editBeacon');
	}


}); 

module.exports = router;