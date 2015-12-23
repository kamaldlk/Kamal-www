'use strict';
angular.module("hexode.constants").constant('CONSTANTS', {
    WARNING: {
        NAME_REQ: "Name required",
        USER_NAME_REQ: "Username required",
        PASSWORD_REQ: "Password required",
        EMAIL_REQ: "Email required",
        CONF_PASSWORD_REQ: "Confirm password required",
        ROLE_NAME_REQ: "Rolename required",
        PASSWORD_MISMATCH: "Confrim password didnot match with password",

        /*APPARTMENT WARNING*/
        APT_NAME_REQ: "Apatment name required",
        APT_CONTRACT_REQ: "Contract person required",
        APT_TELEPHONE_REQ: "Telehone number required",
        APT_EMAIL_REQ: "Email required",
        APT_ADDRESSNO_REQ: "Address number required",
        APT_STREET_REQ: "Stree name required",
        APT_CITY_REQ: "City required",
        APT_DISTRICT_REQ: "District required",
        APT_SUB_DISTRICT_REQ: "Sub district required",
        APT_ZIPCODE_REQ: "Zipcode required",
        APT_ROOM_TYPE_REQ: "Room type required",
        APT_NO_OF_BED_ROOM_REQ: "No of bed room required",
        APT_ROOM_SIZE_REQ: "Room size rquired",
        APT_RENTAL_FEE_REQ: "Rental fees required",
        APT_DEPOSIT_REQ: "Deposit rquired",
        APT_RENT_PREPAID_REQ: "Number of month rent prepaid required",
        APT_WATER_FEE_REQ: "Water fees required",
        APT_ELECTRIC_FEE_REQ: "Electric fees required",
        APT_TELEPHONE_FEE_REQ: "Telephone fees requried"

    },
    ERROR: {
        SIGNUP_FAILED: "Failed to register.Please try again later",
        SIGNIN_FAILED: "Failed to sign in.Please try again later",
        APT_CREATE_FAILED: "Failed to create apartment.Please try again later",
        APT_UPDATE_FAILED: "Failed to update apartment.Please try again later",
        APT_DELETE_FAILED: "Failed to delete apartment.Please try again later",
        USER_UPDATE_FAILED: "Failed to update.",
        USER_DELETE_FAILED: "Failed to delete user."
    },
    SUCCESS: {
        APT_CREATED: "New Apartment created",
        APT_UPDATED: "Apartment updated",
        APT_DELETED: "Apartment deleted",
        USER_DETAIL_UPDATED: "User updated",
        USER_DELETED: "User deleted"
    },
    USER_ROLE: {
        ADMIN: "admin",
        SEEKER: "seeker"
    }
});