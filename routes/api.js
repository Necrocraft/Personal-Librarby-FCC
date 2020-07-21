/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
require("dotenv/config");
const mongoose = require('mongoose');
const shortid = require('shortid');

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true },  () => {
    console.log("Connected to DB");
});

const UrlSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    _id : {
        type : String,
        required : true
    },
  comments: {
    type: Array
  }
});

const Url = mongoose.model('Url', UrlSchema);




module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(function (req, res){
      var title = req.body.title;
      //response will contain new book object including atleast _id and title
        Url.findOne({'title': title}, async (err, data) => {
        console.log(data);
        if(data === null) {
            const user = new Url({
                title: title,
                _id: shortid.generate()
            })
            try {
                const savedValue = await user.save();
                return res.json(savedValue);
            }
            catch(err) {
                return res.json({message: err});
            }
        }
        else {
            res.json({error: "Already exists"});
        }
    })
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      var bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      var bookid = req.params.id;
      var comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      var bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
