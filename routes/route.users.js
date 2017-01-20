var express = require('express');
var router = express.Router();

var mongoose 	= require('mongoose');
var UsersModel 	= mongoose.model('UsersModel');

/* GET users listing. */
router.get('/users.json', function(req, res, next) {

	UsersModel.find({}, function(err, users) {
		res.json(users);
	});
});

module.exports = router;
