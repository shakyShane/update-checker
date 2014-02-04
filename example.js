var updateChecker = require("./lib/index");

updateChecker.checkForUpdate("browser-sync", "0.5.2").then(function (newer) {
    if (newer) {
        // There's a newer version available
        // Prompt your users to upgrade.
    } else {
        // Package is up-to-date
    }
}).fail(function (errorMsg) {
    console.log(errorMsg);
});