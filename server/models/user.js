var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
        name: String,
        login: String,
        password: String,        
        admin: Boolean
}));