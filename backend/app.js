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

// Charge routes with preifijs or call routes of file routes
app.use('/api', articleRoutes);

// Export file
module.exports = app;