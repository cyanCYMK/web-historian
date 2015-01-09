var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  var fileStream = fs.createReadStream(asset);
  var stream = '';

  fileStream.on('error', function(exception){
    console.log('\nError on filestream: ', exception);
    console.log('Url attempted to be opened is: ', asset);
    exports.sendResponse(res, 'File not found', 404);
  });

  fileStream.on('data', function(data){
    stream += data;
  });

  fileStream.on('close', function(){
    // console.log(stream);
    callback(stream);
    //exports.sendResponse(res, stream);
  });

};



// As you progress, keep thinking about what helper functions you can put here!

exports.sendResponse = function(res, obj, status){
  status = status || 200;
  res.writeHead(status, headers);
  res.end(obj);
};
