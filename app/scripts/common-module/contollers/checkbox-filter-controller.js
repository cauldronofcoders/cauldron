                    angular.module("myMPCSApp.filterModule",["checklist-model"]).controller("FilterDataController",function(FilterDataFactory,$scope){       //factory name is passed

                        var path='userMDN.json';            //common json Path


                        $scope.selectedVal=[];                      //mapped to the checked checkbox values
                        $scope.checked=true;                        //to show all the data initially


                 FilterDataFactory.jsonData(function(response){
                            $scope.userInfo=response;
                                                                    //Reading common json
                             },path);


                            $scope.showData=function(){
                             $scope.checked=false;
                                $scope.filterdata=[];

                                angular.forEach($scope.selectedVal,function(MDN){ //for each value of this array this function will be called


                                var url=MDN+".json";                             //creating specific json url

                               FilterDataFactory.jsonData(function(response){

                                    $scope.filterdata.push(response);       //reading specific json as per checkbox selection

                                },url);



                            });


                        }});













