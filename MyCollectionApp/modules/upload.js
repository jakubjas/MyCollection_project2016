var express = require('express');
var path = require('path');
var fs = require('fs');
var crypto = require('crypto');
var multiparty = require('connect-multiparty');

var app = express();
var multipartyMiddleware = multiparty();

// uploading files
app.post('/', multipartyMiddleware, function (req, res) {

    var file = req.files.file;

    fs.readFile(file.path, function (err, data) {

        var filename = 'cover' + crypto.randomBytes(4).readUInt32LE(0) + path.extname(file.path);
        var newPath = __dirname + "/../public/images/" + filename;

        fs.writeFile(newPath, data, function (err) {

            if (err) {
                res.json(300, {'response': 'Error'});
            }
            else {
                res.json({'response': "Saved", 'filename': filename});
            }

        });
    });
});

module.exports = app;