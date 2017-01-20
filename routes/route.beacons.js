var express 	= require('express'); 
var mongoose 	= require('mongoose'); 
var auth_check		= require('../custom_middleware/auth_check');

var router 			= express.Router(); 
var BeaconsModel 	= mongoose.model('BeaconsModel'); 
var ContentsModel	= mongoose.model('ContentsModel'); 

// GET beacon list page
router.get('/beaconsList',auth_check, function (req, res, next) { 
	BeaconsModel.find(function (err, beaconsList) {
		if(!err){
			ContentsModel.find(function (err, contentsList) {
				console.log("Find Beacon + Content"); 
				console.log("beaconsList : ", beaconsList); 
				console.log("contentsList : ", contentsList); 

				if(!err){
					res.render('beaconsList', {
						title : 'Beacon List', 
						error : { 
							message: req.flash('info')
						}, 
						contents : contentsList, 
						beacons : beaconsList
					}); 
				} else{
					res.statusCode = 500;
					console.log('Internal error(%d): %s',res.statusCode,err.message);
					req.flash('info', 'Something went wrong on the server... Try again later.'); 		
					
					return res.json({ 
						error: 'Server error' 
					});
				}
			}); 
		}else{
			res.statusCode = 500;
			console.log('Internal error(%d): %s',res.statusCode,err.message);
			req.flash('info', 'Something went wrong on the server... Try again later.'); 		

			return res.json({ 
				error: 'Server error' 
			});
		}
	}); 
}); 


module.exports = router;