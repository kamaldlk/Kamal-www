'use strict';
angular.module("hexode.controllers")
    .controller('seekerCtrl', ["$scope", "$state", "$mdSidenav", "$mdDialog", "$rootScope", 'api',
        function ($scope, $state, $mdSidenav, $mdDialog, $rootScope, api) {

            $scope.user = api.User.currentUser || {};

            $scope.toggleSidenav = function (menuId) {
                $mdSidenav(menuId).toggle();
                $scope.menuId = menuId;
            };
            $state.go("seeker.home");
            $scope.home = function () {
                $mdSidenav($scope.menuId).close();
                $state.go("seeker.home");
            }
            $scope.message = function () {
                $mdSidenav($scope.menuId).close();
                $state.go("seeker.message");
            }
            $scope.favourite = function () {
                $mdSidenav($scope.menuId).close();
                $state.go("seeker.favourite");
            }
            $scope.contact = function () {
                $mdSidenav($scope.menuId).close();
                $state.go("seeker.contact");
            }
            $scope.userinfoupdate = function () {
                $mdSidenav($scope.menuId).close();
                $state.go("seeker.userinfoupdate");
            }

            $scope.logout = function () {
                api.User.allUsers.length = 0;
                api.User.currentUser = undefined;
                $state.go('orpHome');
            }
        }
    ]);