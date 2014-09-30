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
  "flags": {
    "hasApplicationJS": false,
    "hasPackageJson": true,
    "hasPublicIndex": false,
    "hasWWWIndex": false,
    "hasCordovaConfigJson": false,
    "hasCordovaConfigXml": false,
    "hasJSSDK": false,
    "hasAndroidManifest": false,
    "hasTiAppXml": false,
    "hasSLN": false,
    "hasPlist": false,
    "hasCSProj": false,
    "hasXamarinAndroidSDK": false,
    "hasMainPage": false
  },
  "weights": {
    "cloud_nodejs": -4,
    "webapp_advanced": -4,
    "client_hybrid": -4,
    "webapp_basic": -4,
    "client_native_android": -10,
    "client_appcelerator": -10,
    "client_native_windowsphone8": -12,
    "client_xamarin": -12
  },
  "detected": [
    "cloud_nodejs",
    "webapp_advanced",
    "client_hybrid",
    "webapp_basic"
  ]
}
```