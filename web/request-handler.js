var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelp = require('./http-helpers.js');
var url = require('url');

var getPages = function(res, fullUrlPath, contentType, statusCode){
  httpHelp.serveAssets(res, fullUrlPath, function(stream){
    httpHelp.headers['Content-Type'] = contentType;
    httpHelp.sendResponse(res, stream, statusCode);
  });
};

var postUrl = function(req, res, callback){
  var urlString = '';
  req.on('data', function(data){
    urlString += data;
  });
  req.on('end', function(){
    urlString = urlString.substr(4);
    //console.log('url string: ', urlString);
    archive.addUrlToList(urlString);
    callback(urlString, res);
  });
}

exports.handleRequest = function (req, res) {
  var urlPath = url.parse(req.url).path;

  if( req.method === 'GET' ){
    if( urlPath === '/' ){
      getPages(res, path.join(archive.paths.siteAssets, 'index.html'), 'html');
    } else if( urlPath === '/styles.css' ){
      getPages(res, path.join(archive.paths.siteAssets, urlPath), 'css');
    } else if( urlPath === '/favicon.ico' ){
      // console.log('wtf is this');
    } else {
      // urlPath = '/www.google.com'
      getPages(res, path.join(archive.paths.archivedSites, urlPath), 'html');
    }
  }
  if( req.method === 'POST' ){
    // if url isn't in sites
      // if url isn't in list, add url to list
      // send back loading page
    // else send back sites page


    postUrl(req, res, archive.isURLArchived);
    // for 2nd arg, pass in somehow the archive.paths.siteAssets + 'loading.html'
    // fullDirectory = archive.paths.siteAssets;
    //getPages(res, fullDirectory, 'loading.html', 'html', 302);
    // httpHelp.sendResponse(res, 'Added to sites.txt', 302);
  }

};
