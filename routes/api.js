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

const BookSchema = mongoose.Schema({
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

const Book = mongoose.model('Book', BookSchema);




module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      Book.find({}, (err, data) => {
        console.log("Database", data);
        if(err) {
            return res.send('Error reading Database');
        }
        else {
            let libraryData = [];
            data.map(book => {
              let obj = {
                title: book.title,
                _id: book._id,
                commentcount: book.comments.length
              }
              libraryData.push(obj);
            })
            console.log("New Data", libraryData);
            res.json(libraryData);
        }
      })
    })
    
    .post(function (req, res){
      var title = req.body.title;
      //response will contain new book object including atleast _id and title
        Book.findOne({'title': title}, async (err, data) => {
        console.log(data);
        if(data === null) {
            const user = new Book({
                title: title,
                _id: shortid.generate()
            })
            try {
                const savedValue = await user.save();
              let obj = {
                title: savedValue.title,
                _id: savedValue._id
              }
                console.log(obj);
                return res.json(obj);
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
      Book.findOne({'_id': bookid}, (err, data) => {
          console.log(data);
          if(data === null) {
            res.json({error : "No book found with the given id :" + bookid})
          }
          else {
              res.json(data);
          }
      })
    })
    
    .post(function(req, res){
      var bookid = req.params.id;
      var comment = req.body.comment;
      //json res format same as .get
          Book.findOneAndUpdate({'_id': bookid}, { $push: { 'comments': comment }}, {new: true} , (err, data) => {
          console.log(data);
          if(data === null) {
            res.json({error : "No book found with the given id :" + bookid})
          }
          else {
              res.json(data);
          }
      })
    })
    
    .delete(function(req, res){
      var bookid = req.params.id;
      //if successful response will be 'delete successful'
      Book.findByIdAndDelete({'_id': bookid}, (err, data) => {
        if (err){ 
          return res.json({message: err});
        } 
        else{ 
            console.log("Deleted : ", data);
            res.send("complete delete successful");
        }
      })
    });
  
};
