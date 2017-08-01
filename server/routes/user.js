var express = require('express');
var jwt  = require('jsonwebtoken');
var router = express.Router();
var User = require('../models/user');

router.post('/create', function (req, res, next) {
    var userExample = new User({
        name: 'Admin',
        login: 'admin',
        password: 'admin2017',
        admin: true
    });

    userExample.save(function(error) {
        if (error)
            throw error;

        console.log('Example User created succesfully!');
            res.json({
               status: "OK",
               success: true,
               message: 'User Admin created succesfully!'
            });
    });
});

router.route('/users')

    // create a new user (accessed at POST /api/users)
    // params e.g. fullname, email, city, group_ride, days_week

    .post(function (req, res) {

        var userInstance = new User(); // create a new instance of the User model

        userInstance.name = req.body.user.name;
        userInstance.login = req.body.user.login;
        userInstance.password = req.body.user.password;       

        // save the biker and check for errors
        userInstance.save(function (err) {
            if (err)
                res.send(err);

            res.json({
                status: "OK",
                message: 'Biker was created successfully!'
            });

        });
    })

    // Get all users (accessed at GET /api/users 
    .get(function (req, res) {
        User.find(function (err, users) {
            if (err)
                res.send(err);

            res.json({
                users: users
            });
        });
    });

router.route('/users/:user_id')

    // get the user with that id (accessed at GET /api/bikers/:biker_id)
    .get(function (req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })

    // update the user with this id (accessed at PUT /api/bikers/:biker_id)
    .put(function (req, res) {

        // use our user model to find the user we want
        User.findById(req.params.User_id, function (err, user) {

            if (err)
                res.send(err);

            // update the User info
            user.name = req.body.user.name;
            user.login = req.body.user.login;
            user.password = req.body.user.password;            

            // save the user
            user.save(function (err) {
                if (err)
                    res.send(err);

                res.json({
                    status: "OK",
                    message: 'User was updated successfully!'
                });
            });

        });
    })

    // delete the user with this id (accessed at DELETE /api/users/:user_id)
    .delete(function (req, res) {
        User.remove({
            _id: req.params.user_id
        }, function (err, user) {
            if (err)
                res.send(err);

            res.json({
                status: "OK",
                message: 'User was deleted successfully!'
            });
        });
    });

router.use(function(req, res, next) {
    console.log("entered tokenValidation");
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, app.get('superNode-auth'), function(err, decoded) {      
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token!' });    
            } else {
            // Save request to use in another routes
            req.decoded = decoded;    
            next();
            }
        });

    } else {
        // Return 403 if no token found
        return res.status(403).send({ 
            success: false, 
            message: 'There is no token given on the header.' 
        });       
    }
});

module.exports = router;