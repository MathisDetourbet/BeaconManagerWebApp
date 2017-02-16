var express     = require('express');
var sha1 		= require('sha1');
var mongoose 	= require('mongoose');
var bcrypt      = require('bcrypt-nodejs');
var Helpers     = require('../helpers/helpers.js');

var router          = express.Router();
var UsersModel 		= mongoose.model('UsersModel');
var CompaniesModel 	= mongoose.model('CompaniesModel');
var BeaconsModel     = mongoose.model('BeaconsModel'); 

// GET /registration page
router.get('/registration', function(req, res, next) {
  	res.render('registration', {
        title       : 'Registration', 
        error       : { message: req.flash('info') },
        page_name   : 'registration'
    });
});

// POST /registration page
router.post('/registration', function(req, res, next) {
	console.log('ROUTES: POST /registration');

    var company_name = req.body.company_name;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var password = req.body.password;
    var password_confirm = req.body.password_confirm;

	if (password !== password_confirm) {
        console.log('Password Not identical');
        req.flash('info', 'Passwords are not identicals.');
        res.redirect('registration');

    } else if (!Helpers.validateEmail(email)) {
        console.log('Email is not valid.');
        req.flash('info', 'Email is not valid. Please enter valid email format.');
        res.redirect('registration');

    } else if (company_name === undefined || company_name === null || company_name === "") {
        console.log('Company name is empty.');
        req.flash('info', 'Company name is empty.');
        res.redirect('registration');        

    } else if (first_name === undefined || first_name === null || first_name === "") {
        console.log('First name is empty.');
        req.flash('info', 'First name is empty.');
        res.redirect('registration');

    } else if (last_name === undefined || last_name === null || last_name === "") {
        console.log('Last name is empty.');
        req.flash('info', 'Last name is empty.');
        res.redirect('registration');

    } else {
    	// check if the company already exists
        CompaniesModel.findOne({
            name: company_name

        }, function (err, companiesList) {

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
                    email: email

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
                        var pwd_hashed = bcrypt.hashSync(password);

                        var userInstance = new UsersModel({
                            email           : email,
                            first_name      : first_name,
                            last_name       : last_name,
                            password        : pwd_hashed,
                            date_creation   : Date.now()
                        });

                        var api_token = sha1(company_name);

                        var companyInstance = new CompaniesModel({
                            name        : company_name,
                            users_staff : [userInstance],
                            api_token   : api_token
                        });

                        userInstance.save(function(err) {
                            if (err) {
                                if (err.name == 'ValidationError') {
                                    for (field in err.errors) {
                                      console.log(field);
                                      req.flash('info', 'Server error. Please try again.')
                                      res.redirect('registration');
                                    }

                                } else {
                                    // A general error (db, crypto, etc…)
                                    console.warn(err);
                                    req.flash('info', 'Server error. Please try again.')
                                    res.redirect('registration');
                                }

                            } else {
                                console.log('New user added to the database.');

                                companyInstance.save(function(err) {
                                    if (err) {
                                        console.warn(err);

                                    } else {
                                        console.log('New company added to the database.');
                                        var beaconStart = new BeaconsModel({
                                            uuid    : 1111, 
                                            major   : 1, 
                                            minor   : 1, 
                                            alias   : "No beacon assigned", 
                                            company : companyInstance._id
                                        }); 
                                        beaconStart.save(function (err) {
                                            if (err) {
                                                console.warn(err); 
                                            } else {
                                                req.flash('info', 'Registration successful!');
                                                res.redirect('home');
                                            }
                                        })
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
