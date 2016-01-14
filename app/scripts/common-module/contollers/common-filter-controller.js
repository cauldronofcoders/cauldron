(function(angular) {
  'use strict';
angular.module('myMPCSApp.filterController', [])
  .controller('commonFilterController', ['$scope', function($scope) {
    $scope.stringToCapitalize = '';
    $scope.mdnToBeFormatted = '';
  }]);
})(window.angular);