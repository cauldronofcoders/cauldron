/**
 * @description creating a module extending TestApp
 */
angular.module('myMPCSApp.commonUtil', [])
    .service('commonUtils', function() {
        return {
            // ** To check null, empty and undefined for any variables value *//*
            nullable: function(value) {
                if (value !== null && value !== undefined && value !==
                    '') {
                    return !0;
                } else {
                    return !1;
                }
            }
        };
    });
