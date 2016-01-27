angular.module("myMPCSApp.filterModule",[])
.factory("FilterDataFactory",function($http){


    var jsonData=function(response,path){

                                                                    //getting json response
        $http.get(path).success(response);

    };



    return{
        jsonData:jsonData,

    };


});
