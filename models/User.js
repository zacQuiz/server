var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name        : String,
    email       : String,
    photoProfile: String
});

var User = mongoose.model('User', userSchema)
module.exports = User