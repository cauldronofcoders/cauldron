angular.module('myMPCSApp.exceptionFactory',[]).factory('exceptionFactory',function($http,$q){
    var paymentDetails = [];
	
	/* Function to fetch the payment method Details */
	
    paymentDetails.getPaymentDetails = function(){
      return $http({
        'url': 'scripts/common-module/modal/mock-data/paymentMethod1.json'
      }).then(function(res){
        if(typeof(res.data)==='object'){
          return res.data;
        }else{
          return $q.reject(res.data);
        }
      },function(res){
        return $q.reject(res.data);
      });
    };
    return paymentDetails;
    
});
