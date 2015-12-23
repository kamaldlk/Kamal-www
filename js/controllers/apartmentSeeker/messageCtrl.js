'use strict';
angular.module("hexode.controllers")
    .controller('messageCtrl', ["$scope", "$state", "$mdSidenav", "$mdDialog", "$rootScope", "api", "$cordovaToast",
        function ($scope, $state, $mdSidenav, $mdDialog, $rootScope, api, $cordovaToast) {

            $scope.user = api.User.currentUser;
            $scope.chatToUserId = undefined;

            var showMessage = function (msg) {
                $cordovaToast.showShortCenter(msg);
            }

            $scope.owners = [];
            api.User.getAll(function (err, data) {
                if (err) {
                    console.error("Failed to get all users ", err);
                } else {
                    $scope.owners = data;
                }
            });

            var generateRoomId = function (fromid, toid) {
                var roomchatid;
                if (fromid < toid) {
                    roomchatid = fromid + '00' + toid;
                }
                if (fromid > toid) {
                    roomchatid = toid + '00' + fromid;
                }
                if (fromid == toid) {
                    roomchatid = null;
                }
                return roomchatid;
            }

            $scope.createNewChatRoom = function (user) {
                api.Chat.currentRoomId = generateRoomId(user.id, $scope.user.id);
                $scope.chatToUserId = user.id;
                api.Chat.getChatInRoom(api.Chat.currentRoomId, function (err, data) {
                    if (err) {} else {
                        $scope.chats = api.Chat.roomChats;
                    }
                });
            }

            $scope.sendChatMessage = function (msg) {
                var chat = new api.Chat();
                chat.toid = $scope.chatToUserId;
                chat.fromid = $scope.user.id;
                chat.roomchatid = api.Chat.currentRoomId;
                chat.temp = msg;

                chat.user = {
                    id: $scope.user.id
                }

                api.Chat.chatInRoom(chat, function (err, data) {
                    if (err) {
                        showMessage('Failed to send message.');
                    } else {}
                });
            }

            /*filter methods in UI*/
            $scope.getUserName = function (id) {
                var user = _.findWhere($scope.owners, {
                    id: parseInt(id)
                });
                return user.name;
            }

            $scope.getChatAlignClassName = function (chat, item) {
                return chat.fromid == $scope.user.id ? 'right-' + item : 'left-' + item;
            }

        }
    ]);