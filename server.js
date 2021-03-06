
//set up all of the imports
var express = require('express'),
    fs = require('fs'),
    sys = require("sys"),  
    http = require("http"),  
    url = require("url"),  
    path = require("path");
    runner = require("./runner.js"),
    helper = require("./helper.js");

//start the server
var app = express.createServer();

    //configure or some shit
    app.configure(function(){
        app.use(express.methodOverride());
        app.use(express.bodyParser());
        app.use(app.router);
    });
    app.register('.html', require('jade'));
    app.set("view options", { layout: false });
    app.set("views", __dirname + '/');
    
    //get all files
    app.get("/*.*",function(req,res){
        var uri = url.parse(req.url).pathname;
        var filename = path.join(process.cwd(),uri);
        
        path.exists(filename,function(exists){
            if(!exists){
                console.log("404 on: "+filename)
                res.send("404 error, file does not exist");
                return;
            }
            else{
                helper.fileRead(filename,function(file){
                    res.end(file,"binary");
                },function(err){
                    console.log(err);
                    res.end("error:\n"+err);
                });
            }
        });
    });
    
    //get all folders
    app.get("/*/",function(req,res){
        var uri = url.parse(req.url).pathname;
        var dir = path.join(process.cwd(),uri);
        
        path.exists(dir,function(exists){
            if(!exists){
                console.log("404 on: "+dir)
                res.send("404 error, folder does not exist");
                return;
            }
            else{
                helper.folderRead(dir,function(files){
                    for(var i in files){
                        res.writeHead(200,{'content-type':'text/plain'});
                        res.end(files[i]);
                    }
                },function(err){
                    //console.log(err);
                    res.end("error:\n"+err);
                });
            }
        });
    });
    
    //for the root directory
    app.get('/',function(req,res){
        helper.fileRead("./index.html",function(out){
            res.writeHead(200,{'content-type':'text/html'});
            res.end(out,'binary');
        });
        //res.render("./index.html");
    });

    //for posting stuff
    app.post('/', function(req, res){
        runner.run(req.body,function(toPost){
            res.send(toPost);
        });
    });




app.listen(3000);
