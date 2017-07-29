var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    fullname: String,
    email: String,
    city: String,
    groupRide: String,
    daysWeek: String
});

module.exports = mongoose.model('UserSchema', UserSchema);