var express 		= require('express');
var mongoose 		= require('mongoose');
var auth_check		= require('../custom_middleware/auth_check');
var mongoose 		= require('mongoose');

var router 			= express.Router();
var ContentsModel 	= mongoose.model('ContentsModel');

router.get('/contentsList', auth_check, function(req, res, next) {
	
});


module.exports = router;