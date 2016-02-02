
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
$scope.addToCart = function(id,value,quantity) {
    $scope.found = false;

    $scope.shopCart = {
        deviceDetail : value,
        quant : quantity
    } ;

          for(var item in $scope.shoppingCart){
        if($scope.shoppingCart[item]==id){
            $scope.shopCart.quant = $scope.shopCart.quant+quantity;
            SessionService.save(id,JSON.stringify($scope.shopCart));
             $scope.found = true;
        }

        }


        // new item, add now
        if (!$scope.found) {
            SessionService.save(id,JSON.stringify($scope.shopCart));
            $scope.shoppingCart.push(id);
        }
             }


   /*@description function to get the list of phone devices added in cart */
  $scope.getItem = function() {
        $rootScope.searchResult=[];
      for(var key in $scope.shoppingCart){
          $rootScope.searchResult.push(JSON.parse(SessionService.getItem($scope.shoppingCart[key])));

  }
  }



});


