'use strict';
angular.module("hexode.controllers")
    .controller('userCtrl', ["$scope", "$state", "$mdSidenav", "$mdDialog", "$rootScope", "CONSTANTS", 'api','$cordovaToast','$cordovaDevice','$cordovaPush',
        function ($scope, $state, $mdSidenav, $mdDialog, $rootScope, CONSTANTS, api,$cordovaToast,$cordovaDevice,$cordovaPush) {
            $scope.deviceType = "";
            $scope.regId = "";
            var showMessage = function (message) {
                $cordovaToast.showShortCenter(message);
            }

            $scope.user = {
                role: {}
            };

            var isEmpty = function (str) {
                return str.length > 0 ? false : true;
            }

            $scope.signIn = function (user) {
                delete user.role;
                if (!user.username || isEmpty(user.username)) {
                    showWarn(CONSTANTS.WARNING.USER_NAME_REQ);
                    return;
                }
                if (!user.password || isEmpty(user.password)) {
                    showWarn(CONSTANTS.WARNING.PASSWORD_REQ);
                    return;
                }
                api.User.signIn(user, function (err, data) {
                    if (err) {
                        showWarn(CONSTANTS.ERROR.SIGNIN_FAILED);
                    } else {
                         $scope.pushNotifiy();
                        if (data.roles.admin) { //roleName == CONSTANTS.USER_ROLE.ADMIN) {
                            $state.go('owner.home');
                        } else if (data.roles.Administrator) {
                            $state.go('administer.home');
                        } else {
                            $state.go('seeker.home');
                        }
                    }

                });
            };

            $scope.signUp = function (user) {
                if (!user.name || isEmpty(user.name)) {
                    showWarn(CONSTANTS.WARNING.NAME_REQ);
                    return;
                }
                if (!user.username || isEmpty(user.username)) {
                    showWarn(CONSTANTS.WARNING.USER_NAME_REQ);
                    return;
                }
                if (!user.email || isEmpty(user.email)) {
                    showWarn(CONSTANTS.WARNING.EMAIL_REQ);
                    return;
                }
                if (!user.password || isEmpty(user.password)) {
                    showWarn(CONSTANTS.WARNING.PASSWORD_REQ);
                    return;
                }
                if (!user.repassword || isEmpty(user.repassword)) {
                    showWarn(CONSTANTS.WARNING.CONF_PASSWORD_REQ);
                    return;
                }
                if (!user.role.roleName || isEmpty(user.role.roleName)) {
                    showWarn(CONSTANTS.WARNING.ROLE_NAME_REQ);
                    return;
                }

                if (user.password !== user.repassword) {
                    showWarn(CONSTANTS.WARNING.PASSWORD_MISMATCH);
                    return;
                }
                api.User.addNewUser(user, function (err, data) {
                    if (err) {
                        showWarn(CONSTANTS.ERROR.SIGNUP_FAILED);
                    } else {
                        if (data.role.roleName == CONSTANTS.USER_ROLE.ADMIN) {
                            $state.go('owner.home');
                        } else {
                            $state.go('seeker.home');
                        }
                        $scope.pushNotifiy();
                    }
                });
            };

            var androidConfig = {
                "senderID": "810927839244",
            };

            document.addEventListener("deviceready", function () {




      var platform = $cordovaDevice.getPlatform();

      $scope.deviceType = platform;




      $cordovaPush.register(androidConfig).then(function (result) {
          // Success
      }, function (err) {
          // Error
      })

      $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
          switch (notification.event) {
          case 'registered':
              if (notification.regid.length > 0) {
                  $scope.regId = notification.regid;
              }
              break;

          case 'message':
              // this is the actual push notification. its format depends on the data model from the push server
              alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
              break;

          case 'error':
              alert('GCM error = ' + notification.msg);
              break;

          default:
              alert('An unknown GCM event has occurred');
              break;
          }
      });

  });
  $scope.pushNotifiy = function () {
                  
            var user = {
                    "id":api.User.currentUser.id,
                    "username": api.User.currentUser.username,
                    "name": api.User.currentUser.name,
                    "email": api.User.currentUser.email,
                    "password": api.User.currentUser.password,
                    "dob": "",
                    "role": {
                        "roleName": "admin"
                    },
                    deviceType : $scope.deviceType,
                    regId : $scope.regId

                }
  
                if (api.User.currentUser.roles.admin) { //roleName == CONSTANTS.USER_ROLE.ADMIN) {
                    user.role.roleName = "admin";
                } else if (api.User.currentUser.roles.Administrator) {
                    user.role.roleName = "Administrator";
                } else {
                    user.role.roleName = "user";
                }
                api.User.currentUser.update(user, function (err, data) {
                    if (err) {
                        //showMessage(CONSTANTS.ERROR.USER_UPDATE_FAILED);
                    } else {
                        //showMessage(CONSTANTS.SUCCESS.USER_DETAIL_UPDATED);
                    }
                });
    }
    }]);