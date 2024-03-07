// create web serwer
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, 'comments.json');
var comments = require(filePath);
var writeComments = function(comments) {
    fs.writeFile(filePath, JSON.stringify(comments), function(err) {
        if (err) {
            console.log(err);
        }
    });
};
// create new comment
app.post('/comments', jsonParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);
    var comment = {
        id: Date.now()
    }; // Add closing parenthesis here
});