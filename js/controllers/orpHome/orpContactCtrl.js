'use strict';
angular.module("hexode.controllers")
    .controller('orpContactCtrl', ["$scope", "$state", "$mdSidenav", "$mdDialog", "$rootScope",
        function($scope, $state, $mdSidenav, $mdDialog, $rootScope) {

            $scope.toggleSidenav = function(menuId) {
                $mdSidenav(menuId).toggle();
            };
           
        }
    ]);