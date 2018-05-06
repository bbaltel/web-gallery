const port = 8080;

var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
    console.log("Requested " + req.url);
    if (req.url == '/fileupload') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var oldpath = files.filetoupload.path;
            var newpath = `${__dirname}\\web\\assets\\${files.filetoupload.name}`;
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
            });
            fs.readFile('./web/data.json', (err,data) => {
                var obj = JSON.parse(data);
                console.log("Adding " + files.filetoupload.name + " to JSON File");
                var addition = { "caption": fields.caption, "date": fields.date, "path": newpath };
                obj.images[obj.images.length + 1] = addition;
                fs.writeFile(`${__dirname}\\web\\data.json`, JSON.stringify(obj), () => console.log("FINISHED ADDING"));});
            });
            fs.readFile('./web/index.html', (err, data) => {res.write(data, () => res.end())})
    } else if (req.url == "/add") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile('./web/add.html', (err,data) => res.write(data, function() {res.end()}));
    } else if (req.url == "/home" || req.url == "/") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile('./web/index.html', (err,data) => {
            res.write(data, function() {res.end()});
        });   
    } else if (req.url == "/gallery") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile('./web/gallery.html', (err, data) => {
            res.write(data, function() {res.end()})
        });
    } else if (req.url == 'gitimg') {
        res.writeHead(200, { 'Content-Type': 'image/png'});
        fs.readFile('./web/img/github.png', (err, data) => res.write(data, () => {res.end()}));
    } else if (req.url == "favicon") {
        res.writeHead(200, { 'Content-Type': 'image/icon'});
        fs.readFile('./web/img/favicon.ico', (err,data) => res.write(data, () => res.end()));
    } else if (req.url == "json") {
        res.writeHead(200, {"Content-Type": "text/json"});
        fs.readFile('./web/data.json', (err,data) => res.write(data, () => res.end()));
    }
    console.log("Served " + req.url);
}).listen(port, () => console.log(`Server running on port ${port}, visit localhost:${port}`));

