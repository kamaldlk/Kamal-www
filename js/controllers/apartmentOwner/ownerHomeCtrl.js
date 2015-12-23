'use strict';
angular.module("hexode.controllers")
    .controller('ownerHomeCtrl', ["$scope", "$state", "$mdSidenav", "$mdDialog", "$rootScope", "api",
        function ($scope, $state, $mdSidenav, $mdDialog, $rootScope, api) {

            $scope.user = api.User.currentUser;

            $scope.map = {
                center: {
                    latitude: 12.916292,
                    longitude: 80.152379
                },
                zoom: 15,
                bounds: {}
            };

            $scope.options = {
                scrollwheel: true
            };

            $scope.randomMarkers = [];

            api.Appartment.getByUser($scope.user.id, function (err, data) {
                console.log('get appartment response ', data);
                $scope.appartments = data;
                $scope.appartments.forEach(function (apt) {
                    $scope.randomMarkers.push({
                        "latitude": apt.latitude,
                        "longitude": apt.longitude,
                        "title": apt.apartmentName,
                        "id": apt.id
                    })
                });
            });

            $scope.createApartment = function () {
                $state.go('owner.newApartment');
            }

            $scope.viewAppartment = function (apt) {
                $state.go("owner.newApartment", {
                    aptId: apt.id,
                    mode: 'update'
                });
            }

        }
    ]);