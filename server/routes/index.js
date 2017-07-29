var express = require('express');
var router = express.Router();

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

module.exports = router;