var express 	= require('express'); 
var mongoose 	= require('mongoose'); 
var auth_check	= require('../custom_middleware/auth_check');

var router 			= express.Router(); 
var BeaconsModel 	= mongoose.model('BeaconsModel'); 


// GET add new beacon page
router.get('/addBeacon', function (req, res, next) {
	console.log('ROUTES : GET /addBeacon'); 
	res.render('addBeacon',{
		title : 'Add New Beacon', 
		error : {
			message: req.flash('info')
		}
	})
}); 

// POST /addBeacon page
router.post('/addBeacon', function (req, res, next) {
	console.log('ROUTES : POST /addBeacon'); 

	var  beacon = new BeaconsModel({
		uuid	: req.body.uuid,
		major	: req.body.major,
		minor	: req.body.minor, 
		alias 	: req.body.alias
	}); 

	beacon.save(function (err) {
		if (!err) {
			console.log("New beacon created with id: %s", beacon.id);
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