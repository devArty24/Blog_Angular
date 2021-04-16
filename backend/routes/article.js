'use strict'

// Charge express module
var express = require('express');

// Charge controller file
var articleController = require('../controllers/article');

// Call router method of express
var router = express.Router();

// Below create the routes you want
router.get('/test-de-controlador', articleController.test);

router.post('/save', articleController.save);
// Convert signed optional parameter ? this route will be reused by placing an optional parameter
router.get('/articles/:last?', articleController.getArticle);




// Export module
module.exports = router;