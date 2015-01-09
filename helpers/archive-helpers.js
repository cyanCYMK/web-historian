var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpHelp = require('../web/http-helpers.js');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.urls = [];

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, 'utf-8', function(err,data){
    if (err){
      console.log(err);
      throw err;
    }
    // console.log(data);
    // console.log('typeof data: ', typeof data);
    // console.log(data.indexOf('example2.com'));
    var results = data.split('\n');
    if(callback){ callback(results); }
  });
};

exports.isUrlInList = function(url, callback){
  exports.readListOfUrls(function(data){
    // console.log('data: ', data);
    // console.log('url: ', url);
    console.log('data is ',data);
    console.log('url is ', url);
    console.log('index is', data.indexOf(url))
    callback(data.indexOf(url) !== -1);
  });
};

exports.addUrlToList = function(url){
  exports.isUrlInList(url, function(check){
    console.log(check);
    if (!check){
      fs.appendFile(exports.paths.list, url+'\n', 'utf-8', {'flags': 'a'}, function(err){
        if (err){
          console.log(err);
          throw err;
        }
      });
        console.log('\nSaved to list!\n');
    }
      //fs.readFile(exports.paths.list, 'utf8', function(err, data){
      //  if(err) throw err;
        //console.log('\nsites.txt contains: ',data);
      //});
  });
};

exports.isURLArchived = function(url, res){
  // check sites file
  // loop through all exports.urls in sites file and add to array

  // CYL: change res to be a callback function
  // i don't think response should be sent back from here...

  var fullDir = exports.paths.archivedSites;
  fs.readdir(fullDir, function(err, files){
    if (err) {
      return false;
    }
    // files is array
    if (files.indexOf(url) !== -1){
      console.log('file is in sites folder');
      httpHelp.serveAssets(res, fullDir+'/'+url, function(stream){
        httpHelp.headers['Content-Type'] = 'html';
        httpHelp.sendResponse(res, stream, 302);
      });
    }
    else {
      console.log('file is not in sites folder');
      exports.urls.push(url);
      //exports.downloadUrls();
      // fs.writeFile(exports.paths.siteAssets+'/log.txt', 'URLS is: ' + urls, function(){});
      console.log(exports.paths.siteAssets+'/log.txt');
      fullDir = exports.paths.siteAssets;
      httpHelp.serveAssets(res, fullDir+'/loading.html', function(stream){
        httpHelp.headers['Content-Type'] = 'html';
        httpHelp.sendResponse(res, stream, 302);
      });
    }
  });
};

exports.downloadUrls = function(callback){
  console.log(exports.urls);
  callback(exports.urls);
  while(exports.urls.length){
    request('http://'+exports.urls[0]).pipe(fs.createWriteStream(exports.paths.archivedSites+'/'+exports.urls[0]));
    exports.urls.shift();
  };
  //urls.forEach(function(site){
  //  request('http://'+site).pipe(fs.createWriteStream(exports.paths.archivedSites+'/'+site));
  //});

};
