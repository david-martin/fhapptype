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
  "cloud_nodejs": -6,
  "webapp_advanced": -6,
  "webapp_basic": 6,
  "client_hybrid": 6,
  "android": -10,
  "titanium": -10,
  "windowsphone": -12,
  "xamarin": -12
}
```