
angular.module('myMPCSApp.listController',[])
.controller('listController', function($scope,$rootScope, URL_CONST, facadeApiFactory,SessionService) {
$scope.shoppingCart = [];
$rootScope.quantity_selected=1;
    alert("value after changing as text"+$scope.quantity_selected);
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
        quant : $scope.quantity_selected
    } ;

console.log("quant"+$scope.shopCart.quant);
          for(var item in $scope.shoppingCart){
        if($scope.shoppingCart[item]==id){
            $scope.shopCart.quant = $scope.quantity_selected+1;
            SessionService.save(id,JSON.stringify($scope.shopCart));
             $scope.found = true;
            console.log("same product"+$scope.shopCart.quant);
        }

        }


        // new item, add now
        if (!$scope.found) {
           $scope.quantity_selected=1;
            $scope.shopCart.quant= $scope.quantity_selected;
            SessionService.save(id,JSON.stringify($scope.shopCart));
            $scope.shoppingCart.push(id);

            console.log("new  product added"+$scope.shopCart.quant)
        }
             }


$scope.updateQuantity=function(id,change,value){


    $scope.shopCart_update = {
        deviceDetail : value,
        quant : change
    } ;
  alert("id is :::"+id);
 SessionService.save(id,JSON.stringify( $scope.shopCart_update));
   alert("inside function,quantt :::"+$scope.shopCart_update.quant);

}

   /*@description function to get the list of phone devices added in cart */
  $scope.getItem = function() {
        $rootScope.searchResult=[];
      for(var key in $scope.shoppingCart){
          $rootScope.searchResult.push(JSON.parse(SessionService.getItem($scope.shoppingCart[key])));

  }
  }



});


