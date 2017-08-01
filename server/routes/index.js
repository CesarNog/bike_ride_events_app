var express = require('express');
var jwt  = require('jsonwebtoken');
var router = express.Router();
var User = require('../models/user');
var config = require('../config/config.json');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Welcome to the Biker Ride Events - API created by @cesarnogcps',
        subtitle: 'Have fun with this API :)'
    });
});

router.post('/', function (req, res, next) {
    res.render('index', {
        title: 'Biker Ride Events API - POST response'
    });
});

router.post('/authenticate', function(req, res) {    
    // Find the user
    User.findOne({
       login: req.body.login 
    }, function(error, user) {
        if (error)
            throw error;
        if (!user) {
            res.json({ success: false, message: 'User authentication failed. User not found!'});
        } else if (user) {
            // Check password
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'User authentication failed. Wrong passwod!'});
            } else {
                console.log(config.development.configName);
                var token = jwt.sign(user, config.development.configName, {
                    expiresIn: 1440 //token expires in 24 hours
                });
                
                res.json({
                    success: true,
                    message: 'Token succesfuly created !',
                    token: token
                });
            }
        }
    });
});

module.exports = router;