var fs = require('fs');
var async = require('async');
var glob = require('glob');
var path = require('path');

module.exports = function(dir, cb) {
  var weights = {};

  var files = [{
    glob: '**/*.plist',
    types: ['ios'],
    weight: 10
  }, {
    glob: 'application.js',
    types: ['cloud_nodejs', 'webapp_advanced'],
    decrease: true,
    weight: 5
  }, {
    glob: 'package.json',
    types: ['cloud_nodejs', 'webapp_advanced'],
    decrease: true
  }, {
    glob: 'package.json',
    types: ['client_hybrid', 'webapp_basic']
  }, {
    glob: 'public/index.html',
    types: ['webapp_advanced']
  }, {
    glob: 'www/index.html',
    types: ['webapp_basic', 'client_hybrid'],
    decrease: true,
    weight: 5
  }, {
    glob: '.cordova/config.json',
    types: ['client_advanced_hybrid'],
    weight: 15
  }, {
    glob: 'www/config.xml',
    types: ['client_advanced_hybrid']
  }, {
    glob: 'www/feedhenry.js',
    types: ['client_hybrid', 'webapp_basic']
  }, {
    glob: 'AndroidManifest.xml',
    types: ['android'],
    weight: 10,
    decrease: true
  }, {
    glob: '**/*.sln',
    types: ['windowsphone', 'xamarin'],
    decrease: true
  }, {
    glob: '**/*.csproj',
    types: ['windowsphone', 'xamarin'],
    decrease: true
  }, {
    glob: '**/FHXamarinAndroidSDK.dll',
    types: ['xamarin'],
    weight: 10,
    decrease: true
  }, {
    glob: '**/MainPage.xaml',
    types: ['windowsphone'],
    weight: 10,
    decrease: true
  }, {
    glob: 'tiapp.xml',
    types: ['titanium'],
    weight: 10,
    decrease: true
  }];

  async.map(files, function(file, acb) {
    var options = {};
    var globPath = path.join(process.cwd(), dir) + '/' + file.glob;
    glob(globPath, options, function (err, res) {
      if (err) return acb(err);

      if (res && res.length > 0) {
        file.types.forEach(function(type) {
          if ('number' !== typeof weights[type]) weights[type] = 0;
          weights[type] += (file.weight || 1);
        });
      } else if (file.decrease) {
        file.types.forEach(function(type) {
          if ('number' !== typeof weights[type]) {
            weights[type] = 0;
          }
          weights[type] -= (file.weight || 1);
        });
      }
      return acb(null);
    });
  }, function(err, res) {
    return cb(err, weights);
  });
};