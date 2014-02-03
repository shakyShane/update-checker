"use strict";

var fs = require("fs");
var exec = require("child_process").exec;
var q = require("q");
var child;

module.exports = {
    /**
     * @returns {Q.promise}
     */
    checkForUpdate: function (current) {

        var deferred = q.defer();
        var isOutdated = this.isOutdated;
        var extractVersion = this.extractVersion;

        this.hasInternetConnection().then(function () {
            child = exec("npm view browser-sync", function (error, stdout, stderr) {
                var latest = extractVersion(stdout);

                if (latest) {
                    if (isOutdated(current, latest)) {
                        deferred.resolve(latest);
                    }
                }
            });
        }, function () {
            // No Internet, reject the promise
            deferred.reject();
        });

        return deferred.promise;
    },
    /**
     * @param {String} name
     * @private
     */
    _constructCommand: function (name) {
        var match = /^[a-z\-]+$/.exec(name);
        if (match) {
            return "npm view " + match[0];
        }
        return false;
    },
    /**
     * @returns {promise|Q.promise}
     */
    hasInternetConnection: function () {
        var deferred = q.defer();

        require('dns').resolve('www.google.com', function(err) {
            if (err) {
                deferred.reject();
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    },
    /**
     * @param {String} resp
     * @returns {Boolean|String}
     */
    extractVersion: function (resp) {
        var regex = /'dist-tags': ?\{ ?latest: ?'(.+)' ?\}/;
        var match = regex.exec(resp);
        if (match) {
            return match[1];
        }
        return false;
    },
    /**
     * @param {String} current
     * @param {String} latest
     */
    isOutdated: function (current, latest) {
        var currentSplit = current.split(".");
        var latestSplit = latest.split(".");
        var isOutdated = false;

        latestSplit.forEach(function (item, i) {
            if (parseInt(item, 10) > parseInt(currentSplit[i])) {
                isOutdated = true;
            }
        });

        return isOutdated;
    }
};