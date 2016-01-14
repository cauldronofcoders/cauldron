angular.module('myMPCSApp.exceptionController',[])
	.controller('exceptionController',function ($scope, exceptionFactory, $exceptionHandler) {
	/* Array Object to store the data coming from Service */
    $scope.paymentDetails = [];
	/* Function for storing the payment method Details response if success is returned */
    exceptionFactory.getPaymentDetails()
    .then(function(res){
        $scope.paymentDetails = res;
    },function(err){
	/*exceptionHandler service is called when request is failed*/	
     $exceptionHandler(err);
    });
});