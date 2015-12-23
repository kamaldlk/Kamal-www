'use strict';
angular.module("hexode.controllers")
    .controller('allapartmentCtrl', ["$scope", "$state", "$mdSidenav", "$mdDialog", "$rootScope", "api", "CONSTANTS", "$cordovaToast",
        function ($scope, $state, $mdSidenav, $mdDialog, $rootScope, api, CONSTANTS, $cordovaToast) {

            $scope.selected = [];
            $scope.filtre = "test";

            var showMessage = function (message) {
                $cordovaToast.showShortCenter(message);
            }

            $scope.query = {
                order: 'name',
                limit: 5,
                page: 1
            };

            $scope.appartments = [];

            api.Appartment.getAll(function (err, appartments) {
                if (err) {
                    console.log('error in get all apparment ', err);
                } else {
                    $scope.appartments = appartments;
                }
            });

            $scope.editApartment = function (apartment) {
                $state.go("administer.editApartment", {
                    aptId: apartment.id
                });
            }

            $scope.deleteApartment = function (apartment) {
                apartment.delete(function (err, data) {
                    if (err) {
                        showMessage(CONSTANTS.ERROR.APT_DELETE_FAILED);
                    } else {
                        showMessage(CONSTANTS.SUCCESS.APT_DELETED);
                    }
                });
            }

        }
    ]);