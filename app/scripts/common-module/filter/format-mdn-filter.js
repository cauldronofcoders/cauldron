(function(angular) {
  'use strict';
  angular.module('myMPCSApp.formatMDNFilter', [])
    .filter('formatMDN', function() {
      return function(input) {
        if (input) {
          /*To convert the input value to string*/
          var inputToString = input.toString();
		  /*MDN is coverted to XXX XXX-XXX format*/
          inputToString = inputToString.substring(0, 3).concat(' ', inputToString.substring(3, 6), '-', inputToString.substring(6, 9));
          return inputToString;
        }
      };
    });
})(window.angular);