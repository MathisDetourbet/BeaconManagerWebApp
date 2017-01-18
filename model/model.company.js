var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

var companySchema = new Schema({
	name			: { type: String, required: true, unique: true },
	users_staff		: [{ type: Schema.Types.ObjectId, ref: 'UsersModel' }],
	api_token		: { type: String, required: true, unique: true },
    date_creation  	: { type: Date, default: Date.now }
});

companySchema.methods.findUserStaff = function(user_staff_id) {
	for (var i = this.users_staff.length - 1; i >= 0; i--) {
		var user_staff = this.users_staff[i];
		if (user_staff === user_staff_id) {
			return user_staff; 
		}
	}

	return false;
};

module.exports = mongoose.model('CompaniesModel', companySchema);