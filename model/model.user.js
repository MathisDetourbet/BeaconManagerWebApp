var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

var userSchema = new Schema({
	first_name     	: { type: String, required: true, match: /^[a-zàâçéèêëîïôûùüÿñæœ-]+$/i },
    last_name      	: { type: String, required: true, match: /^[a-zàâçéèêëîïôûùüÿñæœ-]+$/i },
    email         	: { type: String, required: true, match: /^[a-zA-Z0-9]([-_.]?[a-zA-Z0-9])*@[a-zA-Z0-9]([-.]?[a-zA-Z0-9])*\.([a-z]{2,4})$/ },
    password      	: { type: String, required: true},
    company		  	: { type: Schema.Types.ObjectId, ref: 'CompaniesModel'},
    date_creation  	: { type: Date, default : Date.now }
});

module.exports = mongoose.model('UsersModel', userSchema);