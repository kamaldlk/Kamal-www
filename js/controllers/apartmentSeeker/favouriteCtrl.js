'use strict';
angular.module("hexode.controllers")
    .controller('favouriteCtrl', ["$scope", "$state", "$mdSidenav", "$mdDialog", "$rootScope", "api", "$stateParams", "$filter", "aptFacilities",
        function ($scope, $state, $mdSidenav, $mdDialog, $rootScope, api, $stateParams, $filter, aptFacilities) {
            $scope.selected = [];
            $scope.filtre = "test";
            $scope.favoriteApartments = api.User.currentUser.favorites || [];

            $scope.removeFavorite = function (apartment) {
                api.User.currentUser.deleteFavoriteAppartment(apartment.id);
            }

            $scope.query = {
                order: 'tempapartmentName',
                limit: 5,
                page: 1
            };

            /*for viewing appartment in differnt page*/
            var viewAptId = $stateParams.apartmentId;
            if (viewAptId) {

                $scope.options = {
                    scrollwheel: true
                };

                $scope.viewAppartment = _.findWhere(api.Appartment.allAppartments, {
                    id: parseInt(viewAptId)
                });
                $scope.appartmentFecilites = aptFacilities.setFacilityFromString($scope.viewAppartment.facilities, angular.copy(aptFacilities.facilities));

                $scope.map = {
                    center: {
                        latitude: $scope.viewAppartment.latitude,
                        longitude: $scope.viewAppartment.longitude
                    },
                    zoom: 15,
                    bounds: {}
                };
                $scope.randomMarkers = [{
                    "latitude": $scope.viewAppartment.latitude,
                    "longitude": $scope.viewAppartment.longitude,
                    "title": $scope.viewAppartment.apartmentName,
                    "id": $scope.viewAppartment.id
                }];

                $scope.viewAppartment.getComments();

                $scope.addComment = function (msg) {
                    var comment = {
                        apartmentid: $scope.viewAppartment.id,
                        messageContent: msg,
                        nameofuser: api.User.currentUser.name,
                        userid: api.User.currentUser.id,
                        roomchatid: Math.random(),
                        date: new Date()
                    }

                    $scope.viewAppartment.addComment(comment, function (err, data) {
                        console.log('added message is ', data, "and local messages ", $scope.viewAppartment.messages);
                    });
                }

                $scope.getDateTimeString = function (date) {
                    return $filter('date')(date, "dd/MM/yyyy h:m a");
                }
                $scope.result = {};
                $scope.calculateFee = function (months) {
                    $scope.result.prepayFee = parseInt($scope.viewAppartment.numberOfMonthForprepaid) * parseInt($scope.viewAppartment.rentalFee);
                    $scope.result.advanceTotalPrice = $scope.result.prepayFee + parseInt($scope.viewAppartment.deposit);
                    $scope.result.totalPrice = 12 * parseInt($scope.viewAppartment.rentalFee);
                    $scope.result.wholeStayFee = parseInt($scope.viewAppartment.rentalFee) * parseInt(months) + parseInt($scope.viewAppartment.deposit);
                }

            }

            $scope.viewApartment = function (apartment) {
                $state.go('seeker.viewApartment', {
                    apartmentId: apartment.tempApartmentid
                });
            }
        }
    ]);