var fs = require('fs'),
    url = require('url'),
    path = require('path');

exports.fileRead = function(fileName,callback,callbackErr){
    fs.readFile(fileName,"binary",function(err,file){
        if(err){
            callbackErr(err);
            return;
        }
        return callback(file);
    });
}

exports.folderRead = function(path,callback,callbackErr){
    fs.readdir(path,function(err,folder){
        if(err){
            callbackErr(err);
            return;
        }
        return callback(folder);
    });
}
exports.isFileOrFolder = function(pth,fileCallback,folderCallback,errorCallback){
    var filename = path.join(process.cwd(),pth);
    
    path.exists(filename,function(exists){
        if(exists){
            fs.readFile(filename,"binary",function(err,file){
                if(err){
                    return;
                }
                fileCallback(filename);
            });
            
            fs.readdir(pth,function(err,folder){
                if(err){
                    return;
                }
                folderCallback(filename);
            });
        }
        else{
            errorCallback(err);
        }
    });
}

exports.isFile = function(pth){
    return !exports.isFolder(pth);
}

exports.isFolder = function(pth){
    var filename = path.join(process.cwd(),pth);
    
    if(path.existsSync(filename+"/")){
        return true;
    }
    else{
        return false;
    }
}
