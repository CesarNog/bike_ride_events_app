var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config/config.json');

// Database reference and connection
var mongoose = require('mongoose');

// Connect to MongoDB database
mongoose.connection.on("open", function (ref) {
    return console.log("Connected to mongoDB database server!");
});

mongoose.connection.on("error", function (err) {
    console.log("Could not connect to mongoDB database server!");
    return console.log(err);
});

try {
    mongoose.connect(config.development.database);
    db = mongoose.connection;
    console.log("Started MongoDB database connection on: " + config.development.database);
} catch (err) {
    console.log("Setting up failed to connect to: " + config.development.database);
    console.log(err.message);
}

// ## CORS middleware
// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
var allowCrossDomain = function (req, res, next) {
    console.log("writing cross domain headers...");
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
};



// ROUTES
var routes = require('./routes/index');
var users = require('./routes/user');
var bikers = require('./routes/biker');

var app = express();

app.use(allowCrossDomain);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('superNode-auth', config.development.configName);

// REGISTER ROUTES
// All routes will be prefixed with /api
app.use('/api', routes);
app.use('/api', users);
app.use('/api', bikers);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;