'use strict'

// Charge express module
var express = require('express');

// Charge controller file
var articleController = require('../controllers/article');

// Call router method of express
var router = express.Router();

// Charge module connect-multiparty
var multipart = require('connect-multiparty');

// Middleware for route upload-image
var md_upload = multipart({uploadDir: './upload/articles'});

// Below create the routes you want
router.get('/test-de-controlador', articleController.test);

router.post('/save', articleController.save);
// Convert signed optional parameter ? this route will be reused by placing an optional parameter
router.get('/articles/:last?', articleController.getArticles);
router.get('/article/:id', articleController.getArticle);
router.put('/article/:id', articleController.update);
router.delete('/artilce/:id', articleController.delete);
router.post('/upload-image/:id', md_upload, articleController.upload);
router.get('/get-image/:image', articleController.getImage);
router.get('/search/:search', articleController.search);




// Export module
module.exports = router;