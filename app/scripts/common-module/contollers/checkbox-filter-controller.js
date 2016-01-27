                       angular.module("myMPCSApp.filterModule",[]).controller("FilterDataController",function(FilterDataFactory,$scope){       //factory name is passed

                            var path='userMDN.json';            //common json Path
                            $scope.selectedVal=[];                      //mapped to the checked checkbox values
                            $scope.checked=true;
                            $scope.newData=[];
                           $scope.afterClickVal=[];
                         //  $scope.filterdata=[];//to show all the data initially
                           FilterDataFactory.jsonData(function(response){
                                $scope.userInfo=response;
                                                                        //Reading common json
                                 },path);


                         $scope.showData=function(checkboxVal,MDN,index){
                             console.log(checkboxVal,MDN);

                               $scope.checked=false;
                             $scope.afterClickVal[index]=checkboxVal;
                             //alert(MDN);

                                           var url=MDN+".json";                             //creating specific json url

                                   FilterDataFactory.jsonData(function(response){

                                $scope.filterData=response;

                                      $scope.newData.push($scope.filterData);
                                   },url);


                            // console.log(accessData);
                                  }

                                   });















                                 //for each value of this array this function will be called


















