var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Content = new Schema({
	title			: { type: String, required: true },
	text			: { type: String },
	beacon			: [{ 
							beacon_id: { type: Schema.Types.ObjectId, ref: 'BeaconsModel'}, 
							beacon_alias: { type: String , default:"No beacon assigned"}
						}],
	//beacon 			: [{ type: Schema.Types.Mixed }],
	//beacon 			: [{ type: Array, default:[{alias: "No beacon assigned", beacon_id:""}]}], 
	company			: { type: Schema.Types.ObjectId, ref: 'CompaniesModel'},
	date_creation 	: { type: Date, default: Date.now },
	date_update		: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ContentsModel', Content);