var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Content = new Schema({
	title			: { type: String, required: true },
	text			: { type: String },
	beacon			: [{ type: Schema.Types.ObjectId, ref: 'BeaconsModel' }],
	company			: { type: Schema.Types.ObjectId, ref: 'CompaniesModel'},
	date_creation 	: { type: Date, default: Date.now },
	date_update		: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ContentsModel', Content);