var express 		= require('express');
var router 			= express.Router();

var sha1 			= require('sha1');

var mongoose 		= require('mongoose');
var UsersModel 		= mongoose.model('UsersModel');
var CompaniesModel 	= mongoose.model('CompaniesModel');

// GET registration page
router.get('/registration', function(req, res, next) {
  	res.render('registration', { title: 'Registration' });
});


// POST registration
router.post('/registration', function(req, res, next) {
	console.log('ROUTES: POST /registration');
	//console.log('req.body.password: ' + req.body.password);

	if (req.body.password !== req.body.password_confirm) {
        console.log('Password Not identical');
        res.redirect('registration');
    } else {
    	// Check if the message already exist
        CompaniesModel.find({
            name   : req.body.name
        }, function (err, companylist) {
            if (err) { //throw err;
                console.warn(err);
                res.redirect('registration');
            }
            else if (companylist !== null && companylist !== "" && companylist === []) {
                console.log(companylist);
                console.log('User Already exist in the database.');
                res.redirect('registration');
            }
            else
            {
                console.log('The company does not exist in the database.');

                var userInstance = new UsersModel({
                	email			: req.body.email,
                	first_name   	: req.body.firstname,
                    last_name    	: req.body.lastname,
                    email       	: req.body.email,
                    password    	: req.body.password,
                    date_creation	: Date.now()
                });

                var api_token = sha1(req.body.company_name);

                var companyInstance = new CompaniesModel({
                	name 		: req.body.company_name,
                	users_staff	: [userInstance],
                	api_token	: api_token
                });

                userInstance.company = companyInstance;

                userInstance.save(function(err) {
                	if (err) {
                		if (err.name == 'ValidationError') {
                			console.log('### ValidationError ###');
						    for (field in err.errors) {
						      console.log(field);
						    }
						} else {
						    // A general error (db, crypto, etc…)
						    console.warn(err);
						}
                	} else {
                		console.log('new user added to the database.');

                		companyInstance.save(function(err) {
		                	if (err) {
		                		console.warn(err);
		                	} else {
		                		console.log('new company added to the database.');
		                		console.log('company: ' + companyInstance);
		                		res.redirect('/index');
		                	}
	                	});
                	}
                });
        	}	
    	});
	}
});

module.exports = router;
