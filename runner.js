var fs = require('fs'),
    url = require('url'),
    path = require('path'),
    helper = require("./helper.js");

exports.run = function(data,callback){
    console.log("data.cmd: "+data.cmd);
    console.log("data.args: "+data.args);
    console.log();

    if(data.cmd == "ls"){
        ls(data,callback);
    }
    else if(data.cmd == "la"){
        la(callback);
    }
}

function ls (data,callback){
    var showHidden = (data.args.indexOf("a")!= -1)? true : false; 

    helper.folderRead("./",function(data){
        var totalReturn = "<span class='ls'>";
        for(i in data){
            if(data[i][0]=="." && !showHidden){
                continue;
            }
        
            if(helper.isFile(data[i])){
                totalReturn += "<span class='tab'>"+data[i]+"</span>";
            }
            else if(helper.isFolder(data[i])){
                totalReturn += "<span class='blue tab'>"+data[i]+"</span>";
            }
        }
        totalReturn += "</span>";
        callback(totalReturn);
    },function(err){
        console.log(err);
    });
}

function la(callback){
    data = {'cmd':"ls",'args':["a"]}
    ls(data,callback);
}

function help(data,callback)
{
    if(data.args.length == 0){
        callback();
    }
}
