var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var beaconSchema = new Schema({
	uuid			: { type: String, required: true },
	major			: { type: Number, required: true },
	minor			: { type: Number, required: true },
	alias			: { type: String, required: true },
	content			: [{ type: Schema.Types.ObjectId, ref: 'ContentsModel' }],
	company			: { type: Schema.Types.ObjectId, ref: 'CompaniesModel', required: true},
	date_creation	: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BeaconsModel', beaconSchema);