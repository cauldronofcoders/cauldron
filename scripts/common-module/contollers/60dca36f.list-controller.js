
angular.module('myMPCSApp.listController',[])
.controller('listController', function($scope, URL_CONST, facadeApiFactory) {
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

    $scope.addToCart = function (device) {
			var found = false;
			$scope.shoppingCart.forEach(function (item) {
				if (item.deviceName === device.deviceName) {
                   item.quantity++;
					found = true;
				}
			});
			if (!found) {
               $scope.shoppingCart.push(angular.extend({quantity: 1}, device));

			}
		};

});
