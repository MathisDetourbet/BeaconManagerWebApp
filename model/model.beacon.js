var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Beacon = new Schema({
	uuid			: { type: String, required: true },
	major			: { type: String, required: true },
	minor			: { type: String, required: true },
	date_creation	: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BeaconsModel', Beacon);