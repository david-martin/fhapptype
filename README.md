# FeedHenry App type detector

Globs for certain files to determine (as best it can) what type of app is in a directory.
For details of files it checks, see the source.

## Usage

```
fhapptype .
```

Sample output:

```
{
  "globs": {
    "hasPackageJsonLocation": [
      "/Users/dmartin/templates/welcome-app/package.json"
    ],
    "hasWWWIndexLocation": [
      "/Users/dmartin/templates/welcome-app/www/index.html"
    ],
    "hasJSSDKLocation": [
      "/Users/dmartin/templates/welcome-app/www/js/libs/feedhenry/feedhenry.js"
    ]
  },
  "flags": {
    "hasApplicationJS": false,
    "hasPackageJson": true,
    "hasPublicIndex": false,
    "hasWWWIndex": true,
    "hasCordovaConfigJson": false,
    "hasCordovaConfigXml": false,
    "hasAndroidManifest": false,
    "hasTiAppXml": false,
    "hasPlist": false,
    "hasJSSDK": true,
    "hasSLN": false,
    "hasCSProj": false,
    "hasXamarinAndroidSDK": false,
    "hasMainPage": false
  },
  "weights": {
    "cloud_nodejs": -4,
    "webapp_advanced": -4,
    "client_hybrid": 7,
    "webapp_basic": 7,
    "client_native_android": -10,
    "client_appcelerator": -10,
    "client_native_windowsphone8": -12,
    "client_xamarin": -12
  },
  "detected": [
    "client_hybrid",
    "webapp_basic"
  ]
}
```