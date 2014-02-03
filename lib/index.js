"use strict";

var exec = require("child_process").exec;
var q = require("q");
var child;

module.exports = {
    /**
     * @returns {Q.promise}
     */
    checkForUpdate: function (name, current) {

        var deferred = q.defer();
        var command = this._constructCommand(name);
        var isOutdated = this.isOutdated;
        var extractVersion = this.extractVersion;

        if (command) {

            this.hasInternetConnection().then(function () {

                child = exec(command, function (error, stdout) {

                    if (error) {
                        deferred.reject("There was a problem executing the command");
                    }

                    var latest = extractVersion(stdout);

                    if (latest) {
                        if (isOutdated(current, latest)) {
                            deferred.resolve(latest);
                        }
                    }
                });
            }, function () {
                // No Internet, reject the promise
                deferred.reject("Internet Connection not available");
            });
        } else {
            deferred.reject("Invalid Package Name");
        }

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
            if (parseInt(item, 10) > parseInt(currentSplit[i], 10)) {
                isOutdated = true;
            }
        });
        return isOutdated;
    }
};