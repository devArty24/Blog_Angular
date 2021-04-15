'use strict'

// Charge express module
var express = require('express');

// Charge body-parser module
var bodyParser = require('body-parser');

// Ejected express
var app = express();


// Middleaware body-parser
app.use(bodyParser.urlencoded({extended:false}));

// Middleware change data json
app.use(bodyParser.json());

module.exports = app;