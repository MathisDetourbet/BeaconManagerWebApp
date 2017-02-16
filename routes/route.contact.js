var express 	= require('express');
var router 		= express.Router();

router.get('/contact', function(req, res, next) {
	res.render('contact', { 
		title: 'Contact',
		page_name: 'contact' 
	});
});

module.exports = router;