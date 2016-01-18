
/* this is mockDataService , getting the local json data through a http get call */

angular.module('myMPCSApp.searchFactory',[]).factory('searchDataFactory',['$http','$q', function ($http, $q) {
    var searchData = {};
    searchData.getSearchData = function () {
      var deferred = $q.defer();
      $http.get('scripts/common-module/model/mock-data/employeeSearch.json').success(function (data) {
        deferred.resolve(data);
      }).error(function () {
        deferred.reject();
      });
      return deferred.promise;
    };
    return searchData;
}]);
