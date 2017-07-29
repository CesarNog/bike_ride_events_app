var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Biker Ride Events API'
    });
});

router.post('/', function (req, res, next) {
    res.render('index', {
        title: 'Biker Ride Events API - POST response'
    });
});

module.exports = router;