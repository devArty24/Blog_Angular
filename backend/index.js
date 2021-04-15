'use strict'

/* Charge module mongoose */
var mongoose = require('mongoose');

/* Import app.js */
var app = require('./app');
var port = 3900

/* Force methods old */
mongoose.set('useFindAndModify', false);

/* Config Promise */
mongoose.Promise = global.Promise;

/* Connect mongoDB with promise */
mongoose.connect('mongodb://localhost:27017/blog_angular', {useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=>{
            console.log("Connection to DataBase Success!!!");

            // Listen to requests
            app.listen(port, ()=>{
                console.log("Server run to http://localhost:"+port);
            });
        })
        .catch(error =>{
            console.log(error);
        });