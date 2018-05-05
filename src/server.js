const port = 8080;


var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
    console.log("Requested " + req.url);
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var oldpath = files.filetoupload.path;
            var newpath = __dirname + '/web/assets/' + files.filetoupload.name;
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                res.write('File uploaded and moved!');
                res.end();
            });
            fs.readFile(__dirname + '/js/jsAssets/data.json', function (data) {
                var obj = JSON.parse(data);
                console.log("Adding " + files.filetoupload.name + " to JSON File");
                addition = { "caption": fields.caption, "date": fields.date, "path": newpath };
                obj.images[obj.images.length() + 1] = addition;
                fs.writeFile(__dirname + '/js/jsAssets/data.json', JSON.stringify(obj), () => console.log("Added"));
            });
        });

    } else if (req.url == "/add") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile('./web/add.html', (data) => res.end(data));
    } else if (req.url == "/home" || req.url == "/") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile('./web/index.html', (data) => {
            return res.end(data);
        });   
    }
    console.log("Served " + req.url);
}).listen(port, () => console.log("Server running on port " + port));

