/*
This $exceptionHandler by default displays error on console log, below service is for customizing the error to be displayed on application.
*/
angular.module('myMPCSApp.exceptionService', [])
  .factory('$exceptionHandler', function($injector) {
  return function(exception, cause) {
	var $rootScope = $injector.get('$rootScope');
    $rootScope.errors = $rootScope.errors || [];
	$rootScope.errors.push(exception);
  };
});