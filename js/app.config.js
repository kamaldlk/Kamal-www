'use strict';
angular.module("hexode").config(['$stateProvider', '$urlRouterProvider', 'uiGmapGoogleMapApiProvider', 'apiProvider', '$httpProvider',
function ($stateProvider, $urlRouterProvider, GoogleMapApiProviders, apiProvider, $httpProvider) {

        var server = "http://www.hexodetech.com:8080/";

        //delete $httpProvider.defaults.headers.common["X-Requested-With"];

        GoogleMapApiProviders.configure({
            key: 'AIzaSyA-7303EsD9nplclklFbVdchDuP9g5omvY',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization'
        });
        $urlRouterProvider.otherwise('/orpHome');

        $stateProvider
            .state('orpHome', {
                url: '/orpHome',
                templateUrl: 'templates/orpHome/orpHome.html',
                controller: 'orpHomeCtrl'
            })
            /*.state('orpHome.orpHomeContact', {
                url: '/orpHomeContact',
                templateUrl: 'templates/orpHome/orpHomeContact.html',
                controller: 'orpContactCtrl'
            })*/

        .state('signin', {
                url: '/signin',
                templateUrl: 'templates/signin.html',
                controller: 'userCtrl'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'templates/signup.html',
                controller: 'userCtrl'
            })
            apiProvider.setApiUrl(server);
            apiProvider.setApiHeaders({});

       



    }
]);