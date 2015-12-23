'use strict';
angular.module("hexode.providers").provider("api", function apiProvider() {

    var _apiUrl = null;
    this.apiToken = undefined;
    var self = this;
    var setApiToken = function (token) {
        self.apiToken = token;
    }

    this.setApiUrl = function (url) {
        _apiUrl = url;
        //logger.log("SET API URL " + url, "API");
    };

    var _apiHeaders = null;
    this.setApiHeaders = function (headers) {
        _apiHeaders = headers;
    };
    var http = null;
    var httpRequest = function (method, path, data, params, callback) {
        if (http == null) callback({
            error: true,
            errorCode: "HTTP_NULL"
        }, null);
        _apiHeaders['Content-Type'] = 'application/json';
        http({
                method: method,
                url: _apiUrl + path,
                headers: _apiHeaders,
                params: params,
                data: data
            })
            .success(function (data, status, headers, config) {
                if (data.error) {
                    callback(data, null);
                } else {
                    callback(null, data);
                }
            })
            .error(function (data, status, headers, config) {
                console.log('actual http error os ', data);
                callback({
                    error: true,
                    errorCode: "UNKNOWN_ERROR"
                }, null);
            });
    };

    this.$get = ['$http', 'settings',
        function ($http, settings) {
            settings.load(function () {});
            http = $http;
            var apiClass = {};

            {
                apiClass.User = function () {
                    this.id = "";
                    this.name = "";
                    this.username = "";
                    this.email = "";
                    this.dob = "";
                    this.role = {};
                    this.favorites = [];
                    this.compartes = [];
                    this.chats = [];
                    this.shoppingCarts = [];
                    this.notification = [];

                    this.update = function (user, callback) {
                        httpRequest("PUT", "user/user/" + this.id, user, null, function (err, data) {
                            callback(err, data);
                        });
                    };
                    this.delete = function (callback) {
                        httpRequest("DELETE", "user/user/" + this.id, null, null, function (err, data) {
                            callback(err, data);
                        });
                    }
                   
                  
                }

              /*  apiClass.User.allUsers = [];*/

                apiClass.User.addNewUser = function (user, callback) {
                    httpRequest("POST", "user/user/", user, null, function (err, data) {
                        if (err) {
                            callback(err, null);
                        } else {
                            var user = angular.extend(new apiClass.User(), data);
                            apiClass.User.currentUser = user;
                            callback(null, user);
                        }
                    });
                }

               /* apiClass.User.getAll = function (callback) {
                    httpRequest("GET", "user/user/", null, null, function (err, data) {
                        if (err) {
                            callback(err, null);
                        } else {
                            var temp = [];
                            data.forEach(function (user) {
                                temp.push(angular.extend(new apiClass.User(), user));
                            });
                            apiClass.User.allUser = temp;
                            callback(null, temp);
                        }
                    });
                }
*/
               /* apiClass.User.getById = function (userId, callback) {
                    httpRequest("GET", "user/user/" + userId, null, null, function (err, data) {
                        callback(err, data);
                    });
                }
*/
                apiClass.User.signIn = function (user, callback) {
                    httpRequest("POST", "user/authenticate", user, null, function (err, data) {
                        if (err) {
                            callback(err, null);
                        } else {
                            console.log('signined in reqponse', data);
                            var user = angular.extend(new apiClass.User(), data);
                            apiClass.User.currentUser = user;
                            callback(null, user);
                        }
                    });
                }

                Object.defineProperty(apiClass.User, 'currentUser', {
                    set: function (value) {
                        settings.user = value;
                    },
                    get: function () {
                        return settings.user
                    }
                });
            }
            /*USER CLASS END*/

          
            return apiClass;
        }
    ]
});