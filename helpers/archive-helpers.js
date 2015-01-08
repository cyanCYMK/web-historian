var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

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

exports.isUrlInList = function(url){
  exports.readListOfUrls(function(data){
    // console.log('data: ', data);
    // console.log('url: ', url);
    // console.log(data.indexOf(url) !== -1);
    return data.indexOf(url) !== -1;
  });
};

exports.addUrlToList = function(url){
  if(!exports.isUrlInList(url)){
    fs.writeFile(exports.paths.list, url+'\n', 'utf-8', function(err){
      if (err){
        console.log(err);
        throw err;
      }
      console.log('\nSaved to list!\n');
      fs.readFile(exports.paths.list, 'utf8', function(err, data){
        if(err) throw err;
        console.log('\nsites.txt contains: ',data);
      });
    });
  }
};

exports.isURLArchived = function(){
};

exports.downloadUrls = function(){
};
