var mongoose 	= require('mongoose');

var CompaniesModel	= mongoose.model('CompaniesModel');
var UsersModel 		= mongoose.model('UsersModel');
var ContentsModel 	= mongoose.model('ContentsModel');
var BeaconsModel 	= mongoose.model('BeaconsModel');

/**
 * DatabaseManager - Manage the database
 * @constructor
 * @variable {function} getCompanyByUserID - Get the company document by the user ID
 * @variable {function} getBeaconsListByUserID - Get all the beacons list document for a company
 * @variable {function} getContentsListByUserID - Get all the contents list document for a company
 *
 * @constructor
 */
var DatabaseManager = (function() {

	/**
	 * Get the company document by the user id (req.body.session.user_id)
	 * @param {number} user_id
	 * @param {function} callback which returns the company document object or the error cb(err, company)
	*/
	var getCompanyByUserID = function(user_id, cb) {
		if (user_id === undefined || user_id === '') {
			console.log('Check: ' + user_id);
			cb(null, null);

		} else {
			CompaniesModel.findOne({
				users_staff: { "$in": [user_id] }

			}, function(err, company) {
				console.log('result getCompanyByUserID: ' + company);
				if (err) {
					cb(err, null);

				} else if (company === undefined || company === null || company === '') {
					cb(null, null);

				} else {
					cb(null, company);
				}
			});
		}
	};


	/**
	 * Get the list of beacons document for a company by the user id (req.body.session.user_id)
	 * @param {number} user_id
	 * @param {function} callback which returns the company document object or the error cb(err, company)
	*/
	var getBeaconsListByUserID = function(user_id, cb) {
		this.getCompanyByUserID(user_id, function(err, company) {
			if (err) {
				cb(err, null);

			} else {
				BeaconsModel.find({
					company: company

				}, function(err, beacons) {
					if (err) {
						cb(err, null);

					} else {
						cb(null, beacons);
					}
				});
			}
		});
	};


	/**
	 * Get the list of beacons document for a company by the user id (req.body.session.user_id)
	 * @param {number} user_id
	 * @param {function} callback which returns the company document object or the error cb(err, company)
	*/
	var getContentsListByUserID = function(user_id, cb) {
		this.getCompanyByUserID(user_id, function(err, company) {
			if (err) {
				cb(err, null);

			} else {
				ContentsModel.find({
					company: company

				}, function(err, contents) {
					if (err) {
						cb(err, null);

					} else {
						cb(null, contents);
					}
				});
			}
		});
	};

	return {
		getCompanyByUserID: getCompanyByUserID,
		getBeaconsListByUserID: getBeaconsListByUserID,
		getContentsListByUserID: getContentsListByUserID
	};

})();

module.exports = DatabaseManager;