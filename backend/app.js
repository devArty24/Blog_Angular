'use strict'

// Charge express module
var express = require('express');

// Charge body-parser module
var bodyParser = require('body-parser');

// Ejected express
var app = express();

// Charge file routes
var articleRoutes = require('./routes/article');

// Middleaware body-parser
app.use(bodyParser.urlencoded({extended:false}));

// Middleware change data json
app.use(bodyParser.json());

// Configure CORS to allow calls or HTTP requests from the frontend, otherwise it will block access to the api (routes)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Charge routes with preifijs or call routes of file routes
app.use('/api', articleRoutes);

// Export file
module.exports = app;