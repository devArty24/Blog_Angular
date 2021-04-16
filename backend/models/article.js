'use strict'

// Charge moongose
var mongoose = require('mongoose');

// Charge object schema
var schema = mongoose.Schema;

// Define structur of schema
var articleSchema = schema({
    title: String,
    content: String,
    data:{type:Date, default: Date.now},
    image: String
});

// Export model indicating inside quotes 'nameColecction'
module.exports = mongoose.model('Article', articleSchema);