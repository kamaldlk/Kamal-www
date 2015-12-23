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
            .state('orpHome.orpHomeContact', {
                url: '/orpHomeContact',
                templateUrl: 'templates/orpHome/orpHomeContact.html',
                controller: 'orpContactCtrl'
            })

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

        /*seeker*/
        .state('seeker', {
                url: '/seeker',
                templateUrl: 'templates/apartmentSeeker/seeker.html',
                controller: 'seekerCtrl'
            })
            .state('seeker.message', {
                url: '/message',
                templateUrl: 'templates/apartmentSeeker/message.html',
                controller: 'messageCtrl'
            })
            .state('seeker.favourite', {
                url: '/favourite',
                templateUrl: 'templates/apartmentSeeker/favourite.html',
                controller: 'favouriteCtrl'
            })
            .state('seeker.viewApartment', {
                url: '/viewApartment/:apartmentId',
                templateUrl: 'templates/apartmentSeeker/viewApartment.html',
                controller: "favouriteCtrl",

            })
            .state('seeker.contact', {
                url: '/contact',
                templateUrl: 'templates/apartmentSeeker/contact.html',
                controller: 'contactCtrl'
            })
            .state('seeker.home', {
                url: '/home',
                templateUrl: 'templates/apartmentSeeker/seekerHome.html',
                controller: 'seekerHomeCtrl'
            })
            .state('seeker.userinfoupdate', {
                url: '/userinfoupdate',
                templateUrl: 'templates/apartmentSeeker/userInfoUpdate.html',
                controller: 'userinfoupdateCtrl'
            })

        /*administer*/
        .state('administer', {
                url: '/administer',
                templateUrl: 'templates/administer/administer.html',
                controller: 'administerCtrl'
            })
            .state('administer.message', {
                url: '/message',
                templateUrl: 'templates/administer/message.html',
                controller: 'adminMessageCtrl'
            })
            .state('administer.allapartment', {
                url: '/allapartment',
                templateUrl: 'templates/administer/allapartment.html',
                controller: 'allapartmentCtrl'
            })
            .state('administer.editApartment', {
                url: '/editApartment/:aptId',
                templateUrl: 'templates/administer/apartmentinformation.html',
                controller: 'editApartmentCtrl'
            })
            .state('administer.contact', {
                url: '/contact',
                templateUrl: 'templates/administer/contact.html',
                controller: 'contactCtrl'
            })
            .state('administer.home', {
                url: '/home',
                templateUrl: 'templates/administer/administerHome.html',
                controller: 'adminHomeCtrl'
            })
            .state('administer.userinfoupdate', {
                url: '/userinfoupdate',
                templateUrl: 'templates/administer/userInfoUpdate.html',
                controller: 'adminUserinfoupdateCtrl'
            })

        /*owner*/
        .state('owner', {
                url: '/owner',
                templateUrl: 'templates/apartmentOwner/owner.html',
                controller: 'ownerCtrl'
            })
            .state('owner.home', {
                url: '/home',
                templateUrl: 'templates/apartmentOwner/ownerHome.html',
                controller: 'ownerHomeCtrl'
            })
            .state('owner.newApartment', {
                url: '/newApartment/:aptId/:mode',
                templateUrl: 'templates/apartmentOwner/createApartment.html',
                controller: 'createApartmentCtrl'
            })
            .state('owner.userinfoupdate', {
                url: '/userinfoupdate',
                templateUrl: 'templates/apartmentOwner/userInfoUpdate.html',
                controller: 'ownerUserinfoupdateCtrl'
            })
            .state('owner.message', {
                url: '/message',
                templateUrl: 'templates/apartmentOwner/message.html',
                controller: 'ownerMessageCtrl'
            })
            .state('owner.contact', {
                url: '/contact',
                templateUrl: 'templates/apartmentOwner/contact.html',
                controller: 'contactCtrl'
            })


        apiProvider.setApiUrl(server);
        apiProvider.setApiHeaders({});



    }
]);