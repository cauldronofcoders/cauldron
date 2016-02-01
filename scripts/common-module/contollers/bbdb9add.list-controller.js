
angular.module('myMPCSApp.listController',[])
.controller('listController', function($scope,$rootScope, URL_CONST, facadeApiFactory,SessionService) {
$scope.shoppingCart = [];

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


   /*@description function to add phone device to cart */
$scope.addToCart = function(id,value) {
    SessionService.save(id,JSON.stringify(value));
    $scope.shoppingCart.push(id);
     }

   /*@description function to get the list of phone devices added in cart */
  $scope.getItem = function() {
        $rootScope.searchResult=[];
      for(var key in $scope.shoppingCart){
          $rootScope.searchResult.push(JSON.parse(SessionService.getItem($scope.shoppingCart[key])));
  }
  }



});


