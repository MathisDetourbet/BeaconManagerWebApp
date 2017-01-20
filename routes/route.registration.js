var express     = require('express');
var sha1 		= require('sha1');
var mongoose 	= require('mongoose');
var bcrypt      = require('bcrypt-nodejs');

var router          = express.Router();
var UsersModel 		= mongoose.model('UsersModel');
var CompaniesModel 	= mongoose.model('CompaniesModel');

// GET /registration page
router.get('/registration', function(req, res, next) {
  	res.render('registration', { title: 'Registration', error: { message: req.flash('info') } } );
});

// POST /registration page
router.post('/registration', function(req, res, next) {
	console.log('ROUTES: POST /registration');

	if (req.body.password !== req.body.password_confirm) {
        console.log('Password Not identical');
        req.flash('info', 'Passwords are not identical.');
        res.redirect('registration');
    } else {
    	// check if the company already exists
        CompaniesModel.findOne({
            name: req.body.name

        }, function (err, companiesList) {
            console.log('Companies.find(): ' + companiesList);
            if (err) {
                console.warn(err);
                req.flash('info', 'Something went wrong on the server... Try again later.');
                res.redirect('registration');

            } else if (companiesList !== undefined && companiesList !== null && companiesList !== "") {
                // company already exist in the database.
                req.flash('info', 'This company name is not available. Please submit another one.');
                res.redirect('registration');

            } else {
                // the company does not exist in the database
                // check if the user with the given email already exists
                UsersModel.find({
                    email: req.body.email

                }, function (err, usersList) {
                    if (err) {
                        console.warn(err);
                        req.flash('info', 'Something went wrong on the server... Try again later.');
                        res.redirect('registration');

                    } else if (usersList !== null && usersList !== "" && usersList === []) {
                        // user already exist in the database.
                        req.flash('info', 'The user with this email is not available. Please register another one.');
                        res.redirect('registration');

                    } else {
                        var pwd_hashed = bcrypt.hashSync(req.body.password);

                        var userInstance = new UsersModel({
                            email           : req.body.email,
                            first_name      : req.body.firstname,
                            last_name       : req.body.lastname,
                            email           : req.body.email,
                            password        : pwd_hashed,
                            date_creation   : Date.now()
                        });

                        var api_token = sha1(req.body.company_name);

                        var companyInstance = new CompaniesModel({
                            name        : req.body.company_name,
                            users_staff : [userInstance],
                            api_token   : api_token
                        });

                        userInstance.save(function(err) {
                            if (err) {
                                if (err.name == 'ValidationError') {
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
                                        res.redirect('home');
                                    }
                                });
                            }
                        });
                    }
                });
        	}	
    	});
	}
});

module.exports = router;
