angular.module('hexode.factories')
    .factory('aptFacilities', function ($rootScope) {

        var service = {};
        service.facilities = [];

        var addFecilites = function (name) {
            service.facilities.push({
                type: name,
                isPresent: false
            });
        }

        service.getFacilityString = function (facility) {
            var faString = "";
            facility.forEach(function (fa) {
                if (fa.isPresent)
                    faString = faString + "," + fa.type;
            });
            return faString;
        }

        service.setFacilityFromString = function (facilityString, facilities) {
            var fats = facilityString.split(",");
            fats.forEach(function (fa) {
                var temp = _.findWhere(facilities, {
                    type: fa
                });
                if (temp)
                    temp.isPresent = true;
            });
            return facilities;
        }


        addFecilites("Air condition");
        addFecilites("Sink");
        addFecilites("Fan");
        addFecilites("Cable TV");
        addFecilites("Water heater");
        addFecilites("Internet");
        addFecilites("Bed");
        addFecilites("Bedding set");
        addFecilites("Smoking allowed");
        addFecilites("Desk");
        addFecilites("Dressing table");
        addFecilites("Parking");
        addFecilites("Elevator");
        addFecilites("Security guard");
        addFecilites("CCTV");
        addFecilites("Fingerprint security");
        addFecilites("Swimming pool");
        addFecilites("Key card");
        addFecilites("Microwave");
        addFecilites("Type of room");

        return service;

    })