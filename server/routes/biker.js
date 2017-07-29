var express = require('express');
var router = express.Router();
var Biker = require('../models/biker');


/*  CRUD routes for Biker API 
 __________________________________________________________________________
|                               |            |                             |
| Route                         | HTTP Verb  |  Description                |
|_______________________________|____________|_____________________________|
|                               |            |                             |
| /api/bikers                   | POST       | Create a biker              |  
|_______________________________|____________|_____________________________|
|                               |            |                             |
| /api/bikers                   | GET        | Get all the bikers          |
|_______________________________|____________|_____________________________|
|                               |            |                             |
| /api/bikers/:biker_id         | GET        | Get a single biker          |
|_______________________________|____________|_____________________________|
|                               |            |                             |        
| /api/bikers/:biker_id         | PUT        | Update a single biker       |
|_______________________________|____________|_____________________________|
|                               |            |                             |
| /api/bikers/:biker_id         | DELETE     | Delete a single biker       |
|_______________________________|____________|_____________________________|

*/

router.route('/bikers')

    // create a new biker (accessed at POST /api/bikers 
    // params e.g. fullname, email, city, groupRide, daysWeek)

    .post(function (req, res) {

        var bikerInstance = new Biker(); // create a new instance of the Phonebook model

        bikerInstance.fullname = req.body.biker.fullname;
        bikerInstance.email = req.body.biker.email;
        bikerInstance.city = req.body.biker.city;

        // save the phonebook and check for errors
        bikerInstance.save(function (err) {
            if (err)
                res.send(err);

            res.json({
                status: "OK",
                message: 'Phonebook is created successfully!'
            });

        });
    })

    // Get all bikers (accessed at GET /api/bikers 
    .get(function (req, res) {
        Biker.find(function (err, bikers) {
            if (err)
                res.send(err);

            res.json({
                bikers: bikers
            });
        });
    });

router.route('/bikers/:biker_id')

    // get the biker with that id (accessed at GET /api/bikers/:biker_id)
    .get(function (req, res) {
        Biker.findById(req.params.biker_id, function (err, biker) {
            if (err)
                res.send(err);
            res.json(biker);
        });
    })

    // update the biker with this id (accessed at PUT /api/bikers/:biker_id)
    .put(function (req, res) {

        // use our biker model to find the biker we want
        Biker.findById(req.params.biker_id, function (err, biker) {

            if (err)
                res.send(err);

            // update the biker info
            biker.firstname = req.body.biker.firstname;
            biker.lastname = req.body.biker.lastname;
            biker.phonenumber = req.body.biker.phonenumber;

            // save the biker
            biker.save(function (err) {
                if (err)
                    res.send(err);

                res.json({
                    status: "OK",
                    message: 'Biker was updated successfully!'
                });
            });

        });
    })

    // delete the biker with this id (accessed at DELETE /api/bikers/:biker_id)
    .delete(function (req, res) {
        Biker.remove({
            _id: req.params.biker_id
        }, function (err, biker) {
            if (err)
                res.send(err);

            res.json({
                status: "OK",
                message: 'Biker was deleted successfully!'
            });
        });
    });


module.exports = router;