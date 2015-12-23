'use strict';
angular.module("hexode.controllers")
    .controller('editApartmentCtrl', ["$scope", "$state", "api", "aptFacilities", "CONSTANTS", "$stateParams", "$cordovaToast",
        function ($scope, $state, api, aptFacilities, CONSTANTS, $stateParams, $cordovaToast) {

            var showMessage = function (message) {
                $cordovaToast.showShortCenter(message);
            }

            $scope.user = api.User.currentUser;

            $scope.aptFeclities = angular.copy(aptFacilities.facilities);
            $scope.updateMode = false;

            if (angular.isDefined($stateParams.aptId)) {
                $scope.newApartment = _.findWhere(api.Appartment.allAppartments, {
                    id: parseInt($stateParams.aptId)
                });
                if ($scope.newApartment) {
                    $scope.aptFeclities = aptFacilities.setFacilityFromString($scope.newApartment.facilities, $scope.aptFeclities);
                }
            } else {
                $scope.newApartment = new api.Appartment();
            }


            var validateAppartForm = function (apartment) {

                if (!apartment.apartmentName || apartment.apartmentName == "") {
                    showMessage(CONSTANTS.WARNING.APT_NAME_REQ);
                    return;
                }
                if (!apartment.contractPerson || apartment.contractPerson == "") {
                    showMessage(CONSTANTS.WARNING.APT_CONTRACT_REQ);
                    return;
                }
                if (!apartment.telephoneNumber || apartment.telephoneNumber == "") {
                    showMessage(CONSTANTS.WARNING.APT_TELEPHONE_REQ);
                    return;
                }
                if (!apartment.email || apartment.email == "") {
                    showMessage(CONSTANTS.WARNING.APT_EMAIL_REQ);
                    return;
                }
                if (!apartment.addressNo || apartment.addressNo == "") {
                    showMessage(CONSTANTS.WARNING.APT_ADDRESSNO_REQ);
                    return;
                }
                if (!apartment.street || apartment.street == "") {
                    showMessage(CONSTANTS.WARNING.APT_STREET_REQ);
                }
                if (!apartment.city || apartment.city == "") {
                    showMessage(CONSTANTS.WARNING.APT_CITY_REQ);
                    return;
                }
                if (!apartment.district || apartment.district == "") {
                    showMessage(CONSTANTS.WARNING.APT_DISTRICT_REQ);
                    return;
                }
                if (!apartment.subDistrict || apartment.subDistrict == "") {
                    showMessage(CONSTANTS.WARNING.APT_SUB_DISTRICT_REQ);
                    return;
                }
                if (!apartment.zipCode || apartment.zipCode == "") {
                    showMessage(CONSTANTS.WARNING.APT_ZIPCODE_REQ);
                    return;
                }

                apartment.facilities = aptFacilities.getFacilityString($scope.aptFeclities);

                if (!apartment.typeOfRoom || apartment.typeOfRoom.length <= 0) {
                    showMessage(CONSTANTS.WARNING.APT_ROOM_TYPE_REQ);
                    return;
                }

                if (!apartment.numberOfBedroom || apartment.numberOfBedroom.length <= 0) {
                    showMessage(CONSTANTS.WARNING.APT_NO_OF_BED_ROOM_REQ);
                    return;
                }

                if (!apartment.roomsize || apartment.roomsize.length <= 0) {
                    showMessage(CONSTANTS.WARNING.APT_ROOM_SIZE_REQ);
                    return;
                }
                if (!apartment.rentalFee || apartment.rentalFee.length <= 0) {
                    showMessage(CONSTANTS.WARNING.APT_RENTAL_FEE_REQ);
                    return;
                }
                apartment.rentalFee = parseInt(apartment.rentalFee);

                if (!apartment.deposit || apartment.deposit.length <= 0) {
                    showMessage(CONSTANTS.WARNING.APT_DEPOSIT_REQ);
                    return;
                }
                apartment.deposit = parseInt(apartment.deposit);

                if (!apartment.numberOfMonthForprepaid || apartment.numberOfMonthForprepaid.length <= 0) {
                    showMessage(CONSTANTS.WARNING.APT_RENT_PREPAID_REQ);
                    return;
                }
                apartment.deposit = parseInt(apartment.numberOfMonthForprepaid);

                if (!apartment.waterFee || apartment.waterFee.length <= 0) {
                    showMessage(CONSTANTS.WARNING.APT_WATER_FEE_REQ);
                    return;
                }

                if (!apartment.rentalFee || apartment.rentalFee.length <= 0) {
                    showMessage(CONSTANTS.WARNING.APT_RENTAL_FEE_REQ);
                    return;
                }

                if (!apartment.electricFee || apartment.electricFee.length <= 0) {
                    showMessage(CONSTANTS.WARNING.APT_ELECTRIC_FEE_REQ);
                    return;
                }

                /*if (!apartment.internetFee || apartment.internetFee.length <= 0) {
                    showMessage(CONSTANTS.WARNING.APT_FACILITY_REQ);
                }*/

                if (!apartment.telephoneFee || apartment.telephoneFee.length <= 0) {
                    showMessage(CONSTANTS.WARNING.APT_TELEPHONE_FEE_REQ);
                    return;
                }

                return true;

            }


            $scope.updateApartment = function (apartment) {
                if (!validateAppartForm(apartment)) return;
                apartment.user = {
                    id: $scope.user.id
                }
                apartment.update(function (err, data) {
                    if (err) {
                        showMessage(CONSTANTS.ERROR.APT_UPDATED_FAILED);
                    } else {
                        showMessage(CONSTANTS.SUCCESS.APT_UPDATED);
                    }
                    $state.go("administer.home");
                });
            }

        }
    ]);