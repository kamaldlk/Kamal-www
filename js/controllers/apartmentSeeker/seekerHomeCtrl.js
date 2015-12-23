'use strict';
angular.module("hexode.controllers")
    .controller('seekerHomeCtrl', ["$scope", "$state", "$mdSidenav", "$mdDialog", "$rootScope", "api", "CONSTANTS", "$cordovaToast",
        function ($scope, $state, $mdSidenav, $mdDialog, $rootScope, api, CONSTANTS, $cordovaToast) {

            var showMessage = function (message) {
                $cordovaToast.showShortCenter(message);
            }

            $scope.user = api.User.currentUser;

            $scope.map = {
                center: {
                    latitude: 12.916292,
                    longitude: 80.152379
                },
                zoom: 5,
                bounds: {}
            };
            $scope.options = {
                scrollwheel: true
            };

            $scope.randomMarkers = [];

            api.Appartment.getAll(function (err, appartments) {
                if (err) {
                    console.log('error in get all apparment ', err);
                } else {
                    $scope.appartments = appartments;
                    $scope.appartments.forEach(function (apt) {
                        $scope.randomMarkers.push({
                            "latitude": apt.latitude,
                            "longitude": apt.longitude,
                            "title": apt.apartmentName,
                            "id": apt.id
                        })
                    });
                    $scope.map.center = $scope.randomMarkers[0] || {
                        latitude: 12.916292,
                        longitude: 80.152379
                    };
                }
            });

            $scope.user.getFavoriteAppartment();

            $scope.addFavorite = function (apartment) {
                var obj = {
                    user: {
                        id: $scope.user.id
                    },
                    tempApartmentid: apartment.id,
                    tempaddressNo: apartment.addressNo,
                    tempapartmentName: apartment.apartmentName,
                    tempcity: apartment.city,
                    tempdistrict: apartment.district,
                    temprentalFee: apartment.rentalFee,
                    tempstreet: apartment.street,
                    tempsubDistrict: apartment.subDistrict
                }
                $scope.user.addFavoriteAppartment(obj, function (err, data) {
                    if (err) {
                        showMessage(CONSTANTS.ERROR.ADD_FAV_APARTMENT_FAILED);
                    } else {
                        // showMessage(CONSTANTS.ERROR.FAV_APARTMENT_ADDED);
                    }
                });
            }

            $scope.checkForFavoriteAdded = function (favApId) {
                return _.findWhere($scope.user.favorites, {
                    tempApartmentid: favApId
                }) ? true : false;
            }

            $scope.viewAppartment = function (apartment) {
                $state.go("seeker.viewApartment", {
                    apartmentId: apartment.id
                });
            }
        }
    ]);