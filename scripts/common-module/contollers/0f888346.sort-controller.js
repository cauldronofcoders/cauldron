
angular.module('myMPCSApp.sortController',[])
.controller('sortController', function($scope, URL_CONST, sortService, sortFactory, facadeApiFactory) {

/*array of radio button values*/
$scope.sortOptions =['Low to High','High to Low','Earlier dates first','Later dates first'];
$scope.radioValue = 'Low to High';
 
   /*@description function to get the data as per selection of radio button */
  $scope.sortData = function(radioValue) {
    var endPoint = sortService.getFileName($scope.radioValue);
    facadeApiFactory.getRequest(URL_CONST.BASE_URL,
                                endPoint).then(function(res){
       $scope.products=res.data;
    }, function(){
        alert("Unable to fetch sorted data");
    });
  };
   $scope.sortData();
});
