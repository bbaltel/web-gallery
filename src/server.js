const port = 8080;
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
http.createServer(function (req, res) 
{
    console.log("Requested " + req.url);
    if (req.url == '/fileupload') 
    {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) 
        {
            var oldpath = files.filetoupload.path;
            var newpath = `${__dirname}\\web\\assets\\${files.filetoupload.name}`;
            fs.rename(oldpath, newpath, function (err) 
            {
                if (err) throw err;
            });
            fs.readFile('./web/data.json', (err,data) => 
            {
                var obj = JSON.parse(data);
                console.log("Adding " + files.filetoupload.name + " to JSON File");
                var addition = { "caption": fields.caption, "date": fields.date, "path": files.filetoupload.name };
                obj.images[obj.images.length + 1] = addition;
                fs.writeFile(`${__dirname}\\web\\data.json`, JSON.stringify(obj), () => console.log("FINISHED ADDING"));});
            });
            fs.readFile('./web/index.html', (err, data) => {res.write(data, () => res.end())})
    } 
    else if (req.url == "/add") 
    {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile('./web/add.html', (err,data) => res.write(data, function() {res.end()}));
    } 
    else if (req.url == "/home" || req.url == "/") 
    {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile('./web/index.html', (err,data) => {
            res.write(data, function() {res.end()});
        });   
    } 
    else if (req.url == "/gallery") 
    {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile('./web/gallery.html', (err, data) => {
            res.write(data, function() {res.end()})
        });
    } 
    else if (req.url == '/gitimg') 
    {
        res.writeHead(200, { 'Content-Type': 'image/png'});
        fs.readFile('./web/img/github.png', (err, data) => res.write(data, () => {res.end()}));
    } 
    else if (req.url == "/favicon") 
    {
        res.writeHead(200, { 'Content-Type': 'image/x-icon'});
        fs.readFile('./web/img/favicon.ico', (err,data) => res.write(data, () => res.end()));
    } 
    else if (req.url == "/data.json") 
    {
        res.writeHead(200, {"Content-Type": "text/json"});
        fs.readFile('./web/data.json', (err,data) => res.write(data, () => res.end()));
    } 
    else if (req.url == "/galleryimg") {
        res.writeHead(200, {"Content-Type": "image/jpg"});
        fs.readFile(`${__dirname}\\web\\img\\gallery.jpg`, (err, data) => res.end(data));
    }
    else
    {
        fs.readFile('./web/data.json', (err, data) => 
        {
            var object = JSON.parse(data);
            object = JSON.parse(JSON.stringify(object).replace("null,", ""));
            for (i = 0; i < object.images.length; i++) 
            {
                if (req.url.endsWith('.png')) 
                {
                    res.writeHead(200, {"Content-Type": "image/png"});
                }
                else if (req.url.endsWith(".jpg"))
                {
                    res.writeHead(200, {'Content-Type': 'image/jpg'});
                }
                else if (req.url.endsWith('.heif')) 
                {
                    res.writeHead(200, {"Content-Type": "image/heic"});
                }
                fs.readFile(`${__dirname}\\web\\assets\\${req.url.replace("%20", " ")}`, (err, data) => res.end(data));
            }
        });
    }
    console.log("Served " + req.url);
}).listen(port, () => console.log(`Server running on port ${port}, visit localhost:${port}`));