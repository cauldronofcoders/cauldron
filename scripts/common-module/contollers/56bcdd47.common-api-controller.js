/*
* @description creating a module extending myMPCSApp
* All API URLs for GET and POST call are dummy 
*/
angular.module('myMPCSApp.apiController',[]).
controller('demoController',function($scope, URL_CONST, facadeApiFactory){
    
    /* Data for GET and POST request API call*/
    var queryParams = {'w':'12797282'},
        params = {'id':'hamilton'},
        requestData = {'id':'12797282',
                       'name':'hamilton'};
    
    /* Function to call GET api request */
    facadeApiFactory.getRequest(URL_CONST.GET_REQUEST_BASE_URL, 
                                URL_CONST.GET_REQUEST_FILE_NAME).then(function(res){
       console.log(res);
    }, function(){
        alert("GET api request responce not found");
    });
    
    /* Function to call GET api request with param object */
    facadeApiFactory.getRequest(URL_CONST.GET_REQUEST_BASE_URL, 
                                URL_CONST.GET_REQUEST_BASE_URL_WITH_PARAM_FILE_NAME,
                                params).then(function(res){
       console.log(res);
    }, function(){
        alert("GET api request with param responce not found");
    });
    
    /* Function to call GET api request with Query Param object*/
    facadeApiFactory.getRequestWithQueryOptions(URL_CONST.GET_REQUEST_BASE_URL_WITH_QUERY, 
                                                URL_CONST.GET_REQUEST_BASE_URL_WITH_QUERY_PARAM_FILE_NAME,
                                                "",queryParams).then(function(res){
       console.log('RES '+ res);
    });
    
    /* Function to call POST api request with request data object*/
    facadeApiFactory.postRequest(URL_CONST.POST_REQUEST_BASE_URL, 
                                 URL_CONST.POST_REQUEST_FILE_NAME,
                                 requestData).then(function(res){
       console.log('RES '+ res);
    }, function(){
        alert("POST api request with request data responce not found");
    });
});
