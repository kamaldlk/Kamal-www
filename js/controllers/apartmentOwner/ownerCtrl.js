'use strict';
angular.module("hexode.controllers")
    .controller('ownerCtrl', ["$scope", "$state", "$mdSidenav", "$mdDialog", "$rootScope", "api",
        function ($scope, $state, $mdSidenav, $mdDialog, $rootScope, api) {

            $scope.user = api.User.currentUser;

            $scope.toggleSidenav = function (menuId) {
                $mdSidenav(menuId).toggle();
                $scope.menuId = menuId;
            };
            $state.go("owner.home");
            $scope.home = function () {
                $mdSidenav($scope.menuId).close();
                $state.go("owner.home");
            }
            $scope.message = function () {
                $mdSidenav($scope.menuId).close();
                $state.go("owner.message");
            }
            $scope.allapartment = function () {
                $mdSidenav($scope.menuId).close();
                $state.go("owner.allapartment");
            }
            $scope.contact = function () {
                $mdSidenav($scope.menuId).close();
                $state.go("owner.contact");
            }
            $scope.userinfoupdate = function () {
                $mdSidenav($scope.menuId).close();
                $state.go("owner.userinfoupdate");
            }

            $scope.logout = function () {
                api.Appartment.allAppartments.length = 0;
                api.User.currentUser = undefined;
                $state.go('orpHome');
            }
        }
    ]);