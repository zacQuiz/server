var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scoreSchema = new Schema({
    userId  : {type: Schema.Types.ObjectId, ref: 'User'},
    level : String,
    score : Number
});

var Score = mongoose.model('Score', scoreSchema)
module.exports = Score