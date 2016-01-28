
angular.module('myMPCSApp.listController',[])
.controller('listController', function($scope, URL_CONST, facadeApiFactory) {

   /*@description function to get the list of phone devices */
  $scope.getDeviceData = function() {
    facadeApiFactory.getRequest(URL_CONST.BASE_URL_LIST,
                                "getDevices").then(function(res){
       $scope.devices=res.data;
    }, function(){
        alert("Unable to fetch devices");
    });
  };
   $scope.getDeviceData();
});
