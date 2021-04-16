'use strict'

// Import module validator
var validator = require('validator');

// Import model
var Article = require('../models/article');

// Create object literal with methods inside
var controller = {

    test: (req, res)=> {
        return res.status(200).send({
            message: "Accion de prueba"
        });
    },

    save: (request, response)=> {
        // Collect parameters by post
        var params =  request.body;

        // Validate data with (validator)
        try{
            var validateTitle = !validator.isEmpty(params.title);
            var validateContent = !validator.isEmpty(params.content);
        }catch(err){
            return response.status(200).send({
                status: "error",
                message:"Faltan datos por enviar !!!"
            });
        }

        if(validateTitle && validateContent){
            // Create object to save with the model
            var newArticle = new Article();

            // Asigned data to object created
            newArticle.title = params.title;
            newArticle.content = params.content;
            newArticle.image = null;

            // Save article in db
            newArticle.save((error, articleStored)=> {
                // Validate that save article
                if(error || !articleStored){
                    // if dont save, send error
                    return response.status(404).send({
                        status: "error",
                        message: "El articulo no se ha guardado!!!"
                    });
                }

                // Return response positive in case didnt enter in the validation
                return response.status(200).send({
                    status: "success",
                    article: articleStored
                });
            });
        }else{
            return response.status(200).send({
                status: "error",
                message: "Los datos no son validos!!!"
            });
        }
    },

    getArticle: (req, res)=> {
        // Declared fist part of query
        var query = Article.find({});

        // Collect params of the url
        var last = req.params.last;

        // Validate that last exist
        if(last || last != undefined){
            query.limit(5);
        }

        // Extract data of mongoDB
        query.sort('-_id').exec((err, articles)=> {
            if(err){
                return res.status(500).send({
                    status: "error",
                     message: "Error al debolver los articulos !!!"
                });
            }
    
            if(!articles){
                return res.status(404).send({
                    status: "error",
                     message: "No hay articulos para mostrar !!!"
                });
            }

            return res.status(200).send({
                status: "success",
                articles
            });
        });
    }
};

// Export document to use all these methods in the routes file
module.exports = controller;