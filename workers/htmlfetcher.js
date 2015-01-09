#!/usr/bin/env node
// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
// var CronJob = require('cron').CronJob;
var archive = require('../helpers/archive-helpers.js');
var fs = require('fs');
/*
new CronJob('* * * * * *',
  onTick: function(){
    archive.downloadUrls();
  },
  start: true
});

job.start();
*/
 archive.downloadUrls(function(archive.urls){
  console.log("URLS is: ", archive.urls);
  // fs.writeFile(archive.paths.siteAssets+'/log.txt', 'TESTING', function(){});
  // fs.writeFile(archive.paths.siteAssets+'/log.txt', , function(){});
  // fs.writeFile(archive.paths.siteAssets+'/log.txt', 'blah', function(){});

  fs.writeFile(archive.paths.siteAssets+'/log.txt', 'Number is: ' + Math.floor(Math.random()*50) + ' URLS is: ' + archive.urls[0], function(){});
 });
