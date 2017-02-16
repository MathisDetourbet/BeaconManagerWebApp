var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/home');
});

router.get('/home', function(req, res, next) {
	console.log('succes info : ' + req.flash('info'));
	res.render('index', { 
		title: 'Admin interface',
		success: { message: req.flash('info') },
		page_name: 'home'
	});
});

module.exports = router;
