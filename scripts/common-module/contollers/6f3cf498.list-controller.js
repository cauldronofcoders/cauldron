
angular.module('myMPCSApp.listController',[])
.controller('listController', function($scope,$rootScope, URL_CONST, facadeApiFactory,SessionService) {
$scope.shoppingCart = [];

  $scope.shopCart = {
        deviceDetail : '',
        qty : ''
    } ;

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
    $scope.shopCart.deviceDetail = value;
          for(var item in $scope.shoppingCart){
        if($scope.shoppingCart[item]==id){
             $scope.shopCart.qty = $scope.shopCart.qty+quantity;
            SessionService.save(id,JSON.stringify($scope.shopCart));
             $scope.found = true;
        }

        }


     // new item, add now
        if (!$scope.found) {
            $scope.shopCart.qty = quantity;
            SessionService.save(id,JSON.stringify($scope.shopCart));
            $scope.shoppingCart.push(id);
        }
                    }

$scope.updateQuantity=function(id,updatedQty,value){
    $scope.shopCart.deviceDetail = value;
      $scope.shopCart.qty = updatedQty;
 SessionService.save(id,JSON.stringify($scope.shopCart));
}

   /*@description function to get the list of phone devices added in cart */
  $scope.getItem = function() {
        $rootScope.searchResult=[];

      for(var key in $scope.shoppingCart){

          $rootScope.searchResult.push(JSON.parse(SessionService.getItem($scope.shoppingCart[key])));

  }

        if($rootScope.searchResult.length==0)
            {
                $rootScope.dataPresent=false;
            }
      else{
          $rootScope.dataPresent=true;
      }
  }
/* @description  - function to remove a product from cart page*/
 $scope.removeProduct = function(key) {

     alert("Inside remove product method");
    SessionService.removeItem(key);
  }

});


