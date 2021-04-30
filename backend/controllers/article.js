'use strict'

// Import module validator
var validator = require('validator');

// Import file system so that we can delete files uploaded to the server
var fs = require('fs');

// Import module from node.js to get the path of the server system files
var path = require('path');

// Import model
var Article = require('../models/article');
const { Http2ServerRequest } = require('http2');
const { exists } = require('../models/article');

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
            if(params.image){
                newArticle.image = params.image;
            }else{
                newArticle.image = null;
            }

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

    getArticles: (req, res)=> {
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
    },

    getArticle: (req, res)=> {
        // Collect id of url
        var articleId = req.params.id;

        // Check exist id
        if(!articleId || articleId == null){
            return res.status(404).send({
                status: "error",
                 message: "No existe el articulo !!!"
            });
        }

        // Find article with the id
        Article.findById(articleId, (err, article)=> {
            if(err || !article){
                return res.status(404).send({
                    status: "error",
                     message: "No existe el articulo !!!"
                });
            }

            // if pass validates return response success
            return res.status(200).send({
                status: "success",
                 article
            });
        });
    },

    update: (req, res)=> {
        // Collect id of url
        var articleId = req.params.id;

        // Collect data that arrive for put
        var params = req.body;

        // Validate this datas
        try{
            var validateTitle = !validator.isEmpty(params.title);
            var validateContent = !validator.isEmpty(params.content);

            // Check that validates is correct
            if(validateTitle && validateContent){
                // Find and update
                Article.findOneAndUpdate({_id: articleId}, params, {new: true}, (err, articleUpdated)=> {
                    // If return error
                    if(err){
                        return res.status(500).send({
                            status: "error",
                            message: "Error al actualizar !!!"
                        });
                    }

                    // If return an article dont updated
                    if(!articleUpdated){
                        return res.status(500).send({
                            status: "error",
                            message: "No existe el articulo !!!"
                        });
                    }

                    // If all is ok, return article updated
                    return res.status(200).send({
                        status: "success",
                        article: articleUpdated
                    });
                });
            }else{
                return res.status(200).send({
                    status: "error",
                    message: "La validacion no es correcta !!!"
                });
            }

        }catch(error){
            return res.status(404).send({
                status: "error",
                message: "Faltan datos por enviar !!!"
            });
        }
    },

    delete: (req, res)=> {
        // Collect id of url
        var articleId = req.params.id;

        // Find and delete
        Article.findOneAndDelete({_id: articleId}, (err, articleRemoved)=> {
            if(err){
                return res.status(500).send({
                    status: "error",
                    message: "Error al borrar !!!"
                });
            }

            if(!articleRemoved){
                return res.status(404).send({
                    status: "error",
                    message: "No se pudo borrar, pude que no exista este articulo !!!"
                });
            }

            return res.status(202).send({
                status: "success",
                article: articleRemoved
            });
        });
    },

    upload: (req, res)=> {
        // Collectfile of request
        var fileName = 'Imagen no subida...';

        // Validate that arrive data file
        if(!req.files){
            return res.status(404),send({
                    status: "error",
                    message: fileName
                });
        }

        // file path and cut path
        var filePath = req.files.file0.path;
        var fileSplit = filePath.split('\\');
        // Warning for linux or mac comment the line above and use the one below this comment
        // var fileSplit = filePath.split('/');

        // name file
        var fileName = fileSplit[2];

        // Extension file
        var extensionSplit = fileName.split('.');
        var fileExtension = extensionSplit[1];

        // Verified the extension, only images
        if(fileExtension != "png" && fileExtension != "jpg" && fileExtension != "jpeg" && fileExtension != "gif"){
            // if extension is not valid, then delete file upload
            fs.unlink(filePath, (err)=> {
                return res.status(200).send({
                    status: "error",
                    message: "La extencion de la imagen  no es valida!!!"
                });
            });

        }else{
             // If all is valid collect id of url
             var articleId = req.params.id;

             if(articleId){
                // Find article and send name file and save in db
                Article.findOneAndUpdate({_id: articleId}, {image: fileName}, {new: true}, (err, articleUpdated)=> {
                    if(err || !articleUpdated){
                        return res.status(500).send({
                            status: "error",
                            message: "Error al guardar la imagen de articulo !!!"
                        });
                    }

                    return res.status(200).send({
                        status: "success",
                        article: articleUpdated
                    });
                });
             }else{
                return res.status(200).send({
                    status: "success",
                    image: fileName
                });
             }
        }
    },

    getImage: (req, res)=> {
        // Collect file of url
        var file = req.params.image;

        // Path complet of file
        var pathFile = './upload/articles/'+file;

        fs.exists(pathFile, (exists)=> {
            if(exists){
                // If the image exists, we use the path variable that we declare at the beginning of the file so that it allows us to display the image
                return res.sendFile(path.resolve(pathFile));
            }else{
                return res.status(404).send({
                    status: "error",
                    message: "La imagen no existe !!!"
                });
            }
        });
    },

    search: (req, res)=> {
        // Collect string search
        var serachString = req.params.search;

        // Find or
        Article.find({'$or':[
            {'title': {"$regex": serachString, "$options": "i"}},
            {'content': {"$regex": serachString, "$options": "i"}}
        ]})
        .sort([['date', 'descending']])
        .exec((err, articles)=> {
            if(err){
                return res.status(500).send({
                    status: "error",
                    message: "Error en la peticion !!!"
                });
            }
            
            // If search not exist
            if(!articles || articles.length <= 0){
                return res.status(404).send({
                    status: "error",
                    message: "No hay articlos que coincidan con tu busqueda !!!"
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