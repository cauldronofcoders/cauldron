  'use strict';
  angular.module('myMPCSApp.config', [])
   .config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider
     .state('commonLanding', {
        url: '/commonLanding',
        templateUrl: 'scripts/common-module/views/common-landing-page.html',
      })
      .state('commonFilters', {
        url: '/commonFilter',
        templateUrl: 'scripts/common-module/views/common-filters.html',
        controller: 'commonFilterController',
      })
      .state('validation', {
        url: '/validateInput',
        templateUrl: 'scripts/common-module/views/validate-email-tel-zip.html',
      })
      .state('sort', {
        url: '/sortData',
        templateUrl: 'scripts/common-module/views/sort.html',
        controller: 'sortController',
      })
      .state('apiDemo', {
        url: '/apiDemo',
        templateUrl: 'scripts/common-module/views/demo-api.html',
        controller: 'demoController',
      })
     .state('exceptionHandling', {
        url: '/exceptionHandlingDemo',
        templateUrl: 'scripts/common-module/views/exception-handling.html',
        controller : 'exceptionController'
      })
    .state('searchDemo', {
        url: '/searchDemo',
        templateUrl: 'scripts/common-module/views/search-records.html',
        controller : 'searchCtrl'
      })
	$urlRouterProvider.otherwise('/commonLanding');
  })
  .constant('URL_CONST', {
    /* BASE URL constants */
    'GET_REQUEST_BASE_URL': 'http://ergast.com/api/f1/2014/',
    'GET_REQUEST_FILE_NAME': 'driverStandings.json',
    'GET_REQUEST_BASE_URL_WITH_QUERY': 'http://weather.yahooapis.com',
    'GET_REQUEST_BASE_URL_WITH_QUERY_PARAM_FILE_NAME': 'forecastrss',
    'GET_REQUEST_BASE_URL_WITH_PARAM_FILE_NAME': 'drivers/{id}/driverStandings.json',
    'POST_REQUEST_BASE_URL': 'http://posttestserver.com/',
    'POST_REQUEST_FILE_NAME': 'post.php',
    'BASE_URL':'http://mangeshwanjari-test.apigee.net/v1/sortedData',
    'EARLIER_DATES_FIRST':'earlierDatesFirst',
    'HIGH_TO_LOW':'hightoLow',
    'LATER_DATES_FIRST':'laterDatesFirst',
    'LOW_TO_HIGH':'lowToHigh'
});
