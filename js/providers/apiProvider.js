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
                    this.getFavoriteAppartment = function (callback) {
                        var self = this;
                        httpRequest("GET", "getFavoriteFromUser/" + this.id, null, null, function (err, data) {
                            if (err) {
                                (callback || angular.noop)(err, null);
                            } else {
                                console.log('list of favority apps ', data);
                                self.favorites = data;
                                (callback || angular.noop)(null, data);
                            }
                        });
                    }

                    this.addFavoriteAppartment = function (data, callback) {
                        var self = this;
                        httpRequest("POST", "Favorite", data, null, function (err, data) {
                            if (err) {
                                callback(err, null);
                            } else {
                                self.favorites.push(data);
                                callback(null, data);
                            }
                        });
                    }

                    this.deleteFavoriteAppartment = function (favAppId, callback) {
                        var self = this;
                        httpRequest("DELETE", "Favorite/" + favAppId, null, null, function (err, data) {
                            if (err) {
                                (callback || angular.noop)(err, null);
                            } else {
                                self.favorites.splice(_.indexOf(self.favorites, {
                                    id: data.id
                                }), 1);
                                (callback || angular.noop)(null, data);
                            }
                        });
                    }

                }

                apiClass.User.allUsers = [];

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

                apiClass.User.getAll = function (callback) {
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

                apiClass.User.getById = function (userId, callback) {
                    httpRequest("GET", "user/user/" + userId, null, null, function (err, data) {
                        callback(err, data);
                    });
                }

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

            /*APARTMENT CLASS STARTS*/
            {
                apiClass.Appartment = function () {
                    this.id = "";
                    this.knowuserid = "";
                    this.apartmentName = "";
                    this.contractPerson = "";
                    this.telephoneNumber = "";
                    this.addressNo = "";
                    this.street = "";
                    this.city = "";
                    this.subDistrict = "";
                    this.district = "";
                    this.zipCode = "";
                    this.type = "";
                    this.numberOfBedroom = "";
                    this.typeOfRoom = "";
                    this.roomsize = "";
                    this.facilities = "";
                    this.typeOfInternet = "";
                    this.detail = "";
                    this.deposit = "";
                    this.numberOfMonthForprepaid = "";
                    this.rentalFee = "";
                    this.electrictFee = "";
                    this.waterFee = "";
                    this.telephoneFee = "";
                    this.internetFee = "";
                    this.latitude = "";
                    this.longitude = "";
                    this.photos = [{
                        id: "",
                        fileName: "",
                        content: "",
                        contentType: ""
                    }];
                    this.messages = [];

                    this.update = function (callback) {
                        httpRequest("PUT", "Apartment/" + this.id, this, null, function (err, data) {
                            if (err) {
                                callback(err, null);
                            } else {
                                callback(null, data);
                                angular.extend(_.findWhere(apiClass.Appartment.allAppartments, {
                                    id: data.id
                                }), data);
                            }
                        });
                    };

                    this.delete = function (callback) {
                        httpRequest("DELETE", "Apartment/" + this.id, null, null, function (err, data) {
                            if (err) {
                                callback(err, null);
                            } else {
                                apiClass.Appartment.allAppartments.splice(_.indexOf(apiClass.Appartment.allAppartments, {
                                    id: data.id
                                }), 1);
                                callback(null, data);
                            }
                        });
                    }

                    this.deletePhoto = function (photoId) {
                        httpRequest("GET", "Apartment/photo/" + photoId, null, null, function (err, data) {
                            if (err) {
                                console.log('error in signin ', err)
                            } else {
                                console.log('signin success ', data)
                            }
                        });
                    }

                    this.addComment = function (message, callback) {
                        var self = this;
                        httpRequest("POST", "Message", message, null, function (err, data) {
                            if (err) {
                                callback(err, null);
                            } else {
                                self.messages.push(data);
                                callback(null, data);
                            }
                        });
                    }

                    this.deleteComment = function (msgId, callback) {
                        var self = this;
                        httpRequest("DELETE", "Message/" + msgId, null, null, function (err, data) {
                            if (err) {
                                callback(err, null);
                            } else {
                                self.messages.splice(_.indexOf(self.messages, {
                                    id: data.id
                                }), 1);
                                callback(null, data);
                            }
                        });
                    }

                    this.getComments = function (callback) {
                        var self = this;
                        httpRequest("GET", "getMessageFromApartment/" + this.id, null, null, function (err, data) {
                            if (err) {
                                (callback || angular.noop)(err, null);
                            } else {
                                self.messages = data;
                                (callback || angular.noop)(null, data);
                            }
                        });
                    }
                }

                apiClass.Appartment.allAppartments = [];

                apiClass.Appartment.add = function (appartment, callback) {
                    httpRequest("POST", "Apartment", appartment, null, function (err, data) {
                        if (err) {
                            callback(err, null);
                        } else {
                            apiClass.Appartment.allAppartments.push(angular.extend(new apiClass.Appartment(), data));
                            callback(null, data);
                        }
                    });
                }

                apiClass.Appartment.getAll = function (callback) {
                    httpRequest("GET", "Apartment", null, null, function (err, data) {
                        if (err) {
                            callback(err, null);
                        } else {
                            var temp = []
                            data.forEach(function (app) {
                                temp.push(angular.extend(new apiClass.Appartment(), app));
                            });
                            apiClass.Appartment.allAppartments = temp;
                            callback(null, apiClass.Appartment.allAppartments);
                        }
                    });
                }

                apiClass.Appartment.getByUser = function (userId, callback) {
                    httpRequest("GET", "getApartmentFromUser/" + userId, null, null, function (err, data) {
                        if (err) {
                            callback(err, null);
                        } else {
                            var temp = []
                            data.forEach(function (app) {
                                temp.push(angular.extend(new apiClass.Appartment(), app));
                            });
                            apiClass.Appartment.allAppartments = temp;
                            callback(null, apiClass.Appartment.allAppartments);
                        }
                    });
                }

                /*if filter is present will return a matched apatments or it will return all appartments*/
                apiClass.Appartment.getByFilters = function (filters, callback) {
                    httpRequest("GET", "getApartment/", null, filters || "", function (err, data) {
                        if (err) {
                            console.log('error in signin ', err)
                        } else {
                            console.log('signin success ', data)
                        }
                    });
                }



            }
            /*APPARTMENT CLASS END*/

            apiClass.Chat = function () {
                this.id = 0;
                this.toid = 0;
                this.fromid = 0;
                this.roomchatid = 0;
                this.temp = "";
            }

            apiClass.Chat.currentRoomId = undefined;

            apiClass.Chat.roomChats = [];

            apiClass.Chat.chatInRoom = function (message, callback) {
                httpRequest("POST", "Chat/", message, null, function (err, data) {
                    if (err) {
                        callback(err, null);
                    } else {
                        apiClass.Chat.roomChats.push(angular.extend(new apiClass.Chat(), data));
                        callback(null, data);
                    }
                });
            }

            apiClass.Chat.getChatInRoom = function (roomId, callback) {
                httpRequest("GET", "getChatByChatroomid/" + roomId, null, null, function (err, data) {
                    if (err) {
                        callback(err, null);
                    } else {
                        var temp = [];
                        data.forEach(function (chat) {
                            temp.push(angular.extend(new apiClass.Chat(), chat));
                        });
                        apiClass.Chat.roomChats = temp;
                        callback(null, temp);
                    }
                });
            }

            return apiClass;
        }
    ]
});