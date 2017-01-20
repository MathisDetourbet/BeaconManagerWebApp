var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var beaconSchema = new Schema({
	uuid			: { type: String, required: true },
	major			: { type: String, required: true },
	minor			: { type: String, required: true },
	alias			: { type: String, required: true },
	content			: [{ type: Schema.Types.ObjectId, ref: 'ContentsModel' }],
	date_creation	: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BeaconsModel', beaconSchema);