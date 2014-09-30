var fs = require('fs');
var async = require('async');
var glob = require('glob');
var path = require('path');

module.exports = function(dir, cb) {
  var result = {
    globs: {},
    flags: {},
    weights: {},
    detected: []
  };

  var files = [{
    glob: '**/*.plist',
    flag: 'hasPlist',
    types: ['client_native_ios'],
    weight: 10
  }, {
    glob: 'application.js',
    flag: 'hasApplicationJS',
    types: ['cloud_nodejs', 'webapp_advanced'],
    decrease: true,
    weight: 5
  }, {
    glob: 'package.json',
    flag: 'hasPackageJson',
    types: ['cloud_nodejs', 'webapp_advanced'],
    decrease: true
  }, {
    glob: 'package.json',
    flag: 'hasPackageJson',
    types: ['client_hybrid', 'webapp_basic']
  }, {
    glob: 'public/index.html',
    flag: 'hasPublicIndex',
    types: ['webapp_advanced']
  }, {
    glob: 'www/index.html',
    flag: 'hasWWWIndex',
    types: ['webapp_basic', 'client_hybrid'],
    decrease: true,
    weight: 5
  }, {
    glob: '.cordova/config.json',
    flag: 'hasCordovaConfigJson',
    types: ['client_advanced_hybrid'],
    weight: 15
  }, {
    glob: 'www/config.xml',
    flag: 'hasCordovaConfigXml',
    types: ['client_advanced_hybrid']
  }, {
    glob: '**/feedhenry.js',
    flag: 'hasJSSDK',
    types: ['client_hybrid', 'webapp_basic']
  }, {
    glob: 'AndroidManifest.xml',
    flag: 'hasAndroidManifest',
    types: ['client_native_android'],
    weight: 10,
    decrease: true
  }, {
    glob: '**/*.sln',
    flag: 'hasSLN',
    types: ['client_native_windowsphone8', 'client_xamarin'],
    decrease: true
  }, {
    glob: '**/*.csproj',
    flag: 'hasCSProj',
    types: ['client_native_windowsphone8', 'client_xamarin'],
    decrease: true
  }, {
    glob: '**/FHXamarinAndroidSDK.dll',
    flag: 'hasXamarinAndroidSDK',
    types: ['client_xamarin'],
    weight: 10,
    decrease: true
  }, {
    glob: '**/MainPage.xaml',
    flag: 'hasMainPage',
    types: ['client_native_windowsphone8'],
    weight: 10,
    decrease: true
  }, {
    glob: 'tiapp.xml',
    flag: 'hasTiAppXml',
    types: ['client_appcelerator'],
    weight: 10,
    decrease: true
  }];

  async.map(files, function(file, acb) {
    var options = {};
    var globPath = path.join(process.cwd(), dir) + '/' + file.glob;
    glob(globPath, options, function (err, res) {
      if (err) return acb(err);

      if (res && res.length > 0) {
        result.flags[file.flag] = true;
        result.globs[file.flag + 'Location'] = res;
        file.types.forEach(function(type) {
          if ('number' !== typeof result.weights[type]) result.weights[type] = 0;
          result.weights[type] += (file.weight || 1);
        });
      } else {
        result.flags[file.flag] = false;
        if (file.decrease) {
          file.types.forEach(function(type) {
            if ('number' !== typeof result.weights[type]) {
              result.weights[type] = 0;
            }
            result.weights[type] -= (file.weight || 1);
          });
        }
      }
      return acb(null);
    });
  }, function(err, res) {
    for(var weight in result.weights) {
      // console.log('weight', weight, result.weights[weight]);
      if (result.detected.length < 1) {
        result.detected.push(weight);
        continue;
      }
      if (result.weights[result.detected[0]] <  result.weights[weight]) {
        result.detected = [weight];
      } else if (result.weights[result.detected[0]] === result.weights[weight]) {
        result.detected.push(weight);
      }
    }
    return cb(err, result);
  });
};