angular.module('hexode.factories')
    .factory('settings', function ($rootScope) {
        var service = {};
        var settings = {};
        service.loaded = false;

        service.load = function (callback) {
            if (service.loaded) {
                callback();
            } else {
                if (localStorage) {
                    for (var key in localStorage) {
                        try {
                            settings[key] = JSON.parse(localStorage[key]);
                        } catch (ex) {}
                    }
                    callback();
                    service.loaded = true;
                }
            }
        };

        var defineSettings = function (key) {
            Object.defineProperty(service, key, {
                get: function () {
                    return settings[key] || {};
                },
                set: function (val) {
                    settings[key] = val;
                    localStorage[key] = JSON.stringify(val);
                }
            });
        };
        defineSettings("user");

        return service;
    });