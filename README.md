# update-checker [![Build Status](https://travis-ci.org/shakyShane/update-checker.png?branch=master)](https://travis-ci.org/shakyShane/update-checker)

Check if there's an update available for a package on NPM.

## Install
`npm install update-checker`

##API
**updateChecker.checkForUpdate(packageName, installedVersion)**

##Example

```javascript
var updateChecker = require("update-checker");
var pkgJson = require("package.json");

updateChecker.checkForUpdate("browser-sync", pkgJson.version).then(function (newer) {
    if (newer) {
        // There's a newer version available
        // Prompt your users to upgrade.
    } else {
        // Package is up-to-date
    }
}).fail(function (errorMsg) {
    console.log(errorMsg);
});
```

## License
Copyright (c) 2013 Shane Osbourne
Licensed under the MIT license.
