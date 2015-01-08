var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelp = require('./http-helpers.js');
var url = require('url');

var getPages = function(res, fullDirectory, urlPath, contentType){
  var fullUrlPath = path.join(fullDirectory, urlPath);

  // console.log('Join to full url: ', urlPath);
  // console.log('Full directory is: ', fullDirectory);
  // console.log('Full URL path is: ', fullUrlPath);
  // console.log('\n');

  httpHelp.serveAssets(res, fullUrlPath, function(stream){
    httpHelp.headers['Content-Type'] = contentType;
    httpHelp.sendResponse(res,stream,200);
    //exports.sendResponse(res,stream);
  });
};

var postUrl = function(req){
  var urlString = '';
  req.on('data', function(data){
    urlString += data;
  });
  req.on('end', function(){
    urlString = urlString.substr(4);
    console.log('url string: ', urlString);
    archive.addUrlToList(urlString);
  });
}

exports.handleRequest = function (req, res) {
  var urlPath = url.parse(req.url).path;

  if( req.method === 'GET' ){
    var fullDirectory;
    // console.log('URL PATH IS: ', urlPath);
    if( urlPath === '/' ){
      fullDirectory = archive.paths.siteAssets;
      getPages(res, fullDirectory, 'index.html', 'html');

    } else if( urlPath === '/styles.css' ){
      fullDirectory = archive.paths.siteAssets;
      getPages(res, fullDirectory, urlPath, 'css');
    } else if( urlPath === '/favicon.ico' ){
      console.log('wtf is this');
    } else {
      // urlPath = '/www.google.com'
      fullDirectory = archive.paths.archivedSites;
      getPages(res, fullDirectory, urlPath, 'html');
    }
  }

  if( req.method === 'POST' ){
    // console.log("\nthis is the request: ", req);
    postUrl(req);
    httpHelp.sendResponse(res, 'Added to sites.txt', 302);
  }

  // res.end(archive.paths.list);
};
