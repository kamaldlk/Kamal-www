'use strict';
angular.module("hexode.controllers")
    .controller('userinfoupdateCtrl', ["$scope", "$state", "$mdSidenav", "$mdDialog", "$rootScope", "api", "CONSTANTS", "$cordovaToast",
        function ($scope, $state, $mdSidenav, $mdDialog, $rootScope, api, CONSTANTS, $cordovaToast) {

            $scope.user = api.User.currentUser;

            var showMessage = function (msg) {
                $cordovaToast.showShortCenter(msg);
            }

            $scope.updateUser = function () {
                var user = {
                    "id": $scope.user.id,
                    "username": $scope.user.username,
                    "name": $scope.user.name,
                    "email": $scope.user.email,
                    "password": $scope.user.password,
                    "dob": "",
                    "role": {
                        "roleName": "admin"
                    }

                }
                if ($scope.user.roles.admin) { //roleName == CONSTANTS.USER_ROLE.ADMIN) {
                    user.role.roleName = "admin";
                } else if ($scope.user.roles.Administrator) {
                    user.role.roleName = "Administrator";
                } else {
                    user.role.roleName = "user";
                }
                $scope.user.update(user, function (err, data) {
                    if (err) {
                        showMessage(CONSTANTS.ERROR.USER_UPDATE_FAILED);
                    } else {
                        showMessage(CONSTANTS.SUCCESS.USER_DETAIL_UPDATED);
                    }
                });
            }

            $scope.deleteUser = function () {
                $scope.user.delete(function (err, data) {
                    if (err) {
                        showMessage(CONSTANTS.ERROR.USER_DELETE_FAILED);
                    } else {
                        showMessage(CONSTANTS.SUCCESS.USER_DELETED);
                        api.User.currentUser = undefined;
                        api.User.allUsers.length = 0;
                        $state.go('orpHome');
                    }
                });
            }

        }
    ]);