var express		= require('express');
var mongoose	= require('mongoose');
var auth_check	= require('../custom_middleware/auth_check');

var router 		= express.Router();

router.get('/dashboard', auth_check, function(req, res, next) {
	res.render('dashboard', { title: 'Dashboard' });
});

module.exports = router;