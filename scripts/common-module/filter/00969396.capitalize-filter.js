(function(angular) {
  'use strict';
  angular.module('myMPCSApp.capitalizeFilter', [])
    .filter('capitalizeFilter', function() {
      return function(input) {
        if (input) {
          /*Convert the character at 0th index to uppercase and rest of the letters to lowercase*/
          input = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
          return input;
        }
      };
    });
})(window.angular);