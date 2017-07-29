var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BikerSchema = new Schema({
    fullname: String,
    email: String,
    city: String,
    group_ride: String,
    days_week: String
});

module.exports = mongoose.model('BikerSchema', BikerSchema);