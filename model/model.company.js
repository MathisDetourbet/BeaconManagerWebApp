var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

var companySchema = new Schema({
	name			: { type: String, required: true, unique: true },
	users_staff		: [{ type: Schema.Types.ObjectId, ref: 'UsersModel' }],
	api_token		: { type: String, required: true, unique: true },
    date_creation  	: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CompaniesModel', companySchema);