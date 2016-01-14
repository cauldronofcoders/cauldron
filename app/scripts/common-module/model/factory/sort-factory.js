
angular.module('myMPCSApp.factory',[])
.factory('sortFactory', function ($http, $q) {
    var sortService = {};
    /*@description makes GET http request to fetch the sorted data */
    
    sortService.getSortedData = function (url) {
        return $http({
            'url':url 
        }).then(function (res) {
            if (typeof (res.data) === 'object') {
                return res.data;
            } else {
                return $q.reject(res.data);
            }
        }, function (res) {
            return $q.reject(res.data);
        });
    };
    return sortService;
});


