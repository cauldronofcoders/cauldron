/*  This is searchService . first it will call mock-data-service to get all the mock json data. 
	As we are working on mock data, so we are performing serch on the client side. In the real scenario 
	we will call a rest api to do the server side seraching and get the search data . 
*/
angular.module('myMPCSApp.searchService',[]).service('searchService', function ($http, $q,searchDataFactory) {

/* getting local json data from mockDataService */
	var serachdata;
	searchDataFactory.getSearchData().then(function (data) {
      serachdata = data;
    });

/* checking each row to check if serchtext is the substring of any column. Like company, gender, name */

    this.doserach = function (serchtext) {
    	var  filterData = [];
    	
			angular.forEach(serachdata, function(value, key) {
			if( (value.company.toLowerCase().indexOf(serchtext.toLowerCase()) > -1) ||
			 (value.gender.toLowerCase().indexOf(serchtext.toLowerCase()) > -1) ||
			  (value.name.toLowerCase().indexOf(serchtext.toLowerCase()) > -1) ){

				this.push(value);	
			}

			}, filterData);

      return filterData;
    };

});
