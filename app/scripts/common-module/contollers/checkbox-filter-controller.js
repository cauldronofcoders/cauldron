                       angular.module("myMPCSApp.filterModule",[]).controller("FilterDataController",function(FilterDataFactory,$scope){                                                                                                                                //factory name is passed

                            var path='..\userMDN.json';            //common json Path
                            $scope.selectedVal=[];                      //mapped to the checked checkbox values
                            $scope.checked=true;
                            $scope.newData=[];
                           $scope.afterClickVal=[];

                           FilterDataFactory.jsonData(function(response){
                                $scope.userInfo=response;
                                                                        //Reading common json
                                 },path);


                         $scope.showData=function(checkboxVal,MDN,index){
                             console.log(checkboxVal,MDN);

                               $scope.checked=false;
                             $scope.afterClickVal[index]=checkboxVal;


                                           var url=MDN+".json";                             //creating specific json url

                                   FilterDataFactory.jsonData(function(response){

                                $scope.filterData=response;

                                      $scope.newData.push($scope.filterData);
                                   },url);



                                  }

                                   });















                                 //for each value of this array this function will be called


















