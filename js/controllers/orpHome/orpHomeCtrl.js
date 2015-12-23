'use strict';
angular.module("hexode.controllers")
    .controller('orpHomeCtrl', ["$scope", "$state", "$mdSidenav", "$mdDialog", "$rootScope", "api",
        function ($scope, $state, $mdSidenav, $mdDialog, $rootScope, api) {

            /*if (api.User.currentUser.id) {
    api.User.currentUser = angular.extend(api.User.currentUser, new api.User());
    if (api.User.currentUser.roles.admin) { //roleName == CONSTANTS.USER_ROLE.ADMIN) {
        $state.go('owner.home');
    } else {
        $state.go('seeker.home');
    }
}*/
            $scope.toggleSidenav = function (menuId) {
                $mdSidenav(menuId).toggle();
                $scope.menuId = menuId;

            };
            $scope.search = {};

            $scope.contact = function () {
                $mdSidenav($scope.menuId).close();
                $state.go("orpHome.orpHomeContact");
            }
            $scope.home = function () {
                $mdSidenav($scope.menuId).close();
                $state.go("orpHome");
            }

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

            $scope.randomMarkers = [{
                "latitude": 12.916149,
                "longitude": 80.152353,
                "title": "Jayam SuperMarket",
                "id": 0
            }, {
                "latitude": 12.915115,
                "longitude": 80.153115,
                "title": "AGS SuperMarket",

                "id": 1
            }, {
                "latitude": 12.922847,
                "longitude": 80.151881,

                "title": "Coffee Day",
                "id": 2
            }];

            $scope.transitTo = function (state) {
                $state.go(state);
            }

            api.Appartment.getAll(function (err, appartments) {
                if (err) {
                    console.log('error in getting appartments ', err);
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
                }
            });

            $scope.favorite = function () {
                alert('Please login to continue');
                $state.go('signin');
            }
            


}]);
