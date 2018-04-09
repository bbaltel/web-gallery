var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var express = require('express');
var app = express();
var bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static('web'))

function FInput(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldpath = files.filetoupload.path;
    var newpath = "./web/gallery/img/" + files.filetoupload.name;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      res.write('File Uploaded and Moved!');
    });
  });
}


app.post('/processInput', function (err, req, res) {
  if (err) throw err;
  Finput(req, res);
});

app.listen(8008, () => console.log('Server running on 8008'));
