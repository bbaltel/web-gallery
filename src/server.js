var formidable = require('formidable');
var http = require('http');
var fs = require('fs');


http.createServer(function (req, res) {
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        res.writeHead(200, {'Content-Type': 'text/html'});
        form.parse(req, function (err, fields, files) {
            res.write('fileUploaded');
            res.end()
        });
    }
    res.write(fs.readFile('./web/add-photo/index.html'));
}).listen(8080);
