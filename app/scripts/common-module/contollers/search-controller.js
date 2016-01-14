/* this is search controller , containing one function dosearch  */

angular.module('myMPCSApp.searchController',[]).controller('searchCtrl',function ($scope,searchService) {

		/* on serach button click it will call doserach function of searchService with search text string */
		
			$scope.dosearch = function(){
				$scope.friends={};
				$scope.friends = searchService.doserach($scope.searchText);
				
			}

});