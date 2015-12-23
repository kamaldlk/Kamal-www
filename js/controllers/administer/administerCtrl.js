'use strict';
angular.module("hexode.controllers")
    .controller('administerCtrl', ["$scope", "$state", "$mdSidenav", "$mdDialog", "$rootScope", "api",
        function ($scope, $state, $mdSidenav, $mdDialog, $rootScope, api) {

            $scope.user = api.User.currentUser;

            $scope.toggleSidenav = function (menuId) {
                $mdSidenav(menuId).toggle();
                $scope.menuId = menuId;
            };

            $state.go("administer.home");
            $scope.home = function () {
                $mdSidenav($scope.menuId).close();
                $state.go("administer.home");
            }
            $scope.message = function () {
                $mdSidenav($scope.menuId).close();
                $state.go("administer.message");
            }
            $scope.allapartment = function () {
                $mdSidenav($scope.menuId).close();
                $state.go("administer.allapartment");
            }
            $scope.contact = function () {
                $mdSidenav($scope.menuId).close();
                $state.go("administer.contact");
            }
            $scope.userinfoupdate = function () {
                $mdSidenav($scope.menuId).close();
                $state.go("administer.userinfoupdate");
            }

            $scope.logout = function () {
                api.User.allUsers.length = 0;
                api.User.currentUser = undefined;
                $state.go('orpHome');
            }

        }
    ]);