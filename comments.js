// create web serwer for comment

var express = require('express');
var router = express.Router();

var Comment = require('../models/comment');

router.get('/comments', function(req, res, next) {
  Comment.find(function(err, comments) {
    if (err) {
      return next(err);
    }
  });
});
