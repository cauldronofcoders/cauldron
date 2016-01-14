
angular.module('myMPCSApp.sortController',[])
.controller('sortController', function($scope,sortService,sortFactory) {

/*array of radio button values*/
$scope.sortOptions =['Low to High','High to Low','Earlier dates first','Later dates first'];
$scope.radioValue = 'Low to High';
 
   /*@description function to get the data as per selection of radio button */
  $scope.sortData = function(radioValue) {
    var fileName = sortService.getFileName($scope.radioValue);   
    sortFactory.getSortedData(fileName).then(function(response){
    $scope.products=response;
   });
  };
   $scope.sortData();
  
 


});