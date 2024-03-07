// create web serwer
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var comments = require('./comments');

var server = http.createServer(function(req, res) {
    var urlPath = url.parse(req.url).pathname;
    console.log(urlPath);
    if (urlPath == '/comments' && req.method == 'GET') {
        comments.getComments(function(err, data) {
            if (err) {
                res.writeHead(500);
                res.end('Internal server error');
            } else {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(data);
            }
        });
    } else if (urlPath == '/comments' && req.method == 'POST') {
        var body = '';
        req.on('data', function(data) {
            body += data;
        });
        req.on('end', function() {
            comments.addComment(JSON.parse(body), function(err) {
                if (err) {
                    res.writeHead(500);
                    res.end('Internal server error');
                } else {
                    res.writeHead(201);
                    res.end('OK');
                }
            });
        });
    } else {
        fs.readFile(path.join(__dirname, urlPath), function(err, data) {
            if (err) {
                res.writeHead(404);
                res.end('Not found');
            } else {
                res.writeHead(200);
                res.end(data);
            }
        });
    }
});

server.listen(3000, function() {
    console.log('Server is listening on port 3000');
});