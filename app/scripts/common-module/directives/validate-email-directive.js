/* directive for validating email Id
*/
angular.module('myMPCSApp.emailValidation',[])
  .directive('validateEmail', function () {
    //Regular expression for email Id
    var emailRegexp = /^[a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
  
    return {
        restrice: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs) {
        
            angular.element(element).bind('keydown', function (e) {
                var code = e.keyCode || e.which;
                // Condition to disable all the symbols which are not valid for email Id
                if(((code<48 || code > 57) ||(e.shiftKey && (code>47 || code < 58))) && (code<64 || code>90) && code !==8 && code !==46 && code!==190 && !(e.shiftKey && (code === 189|| code === 50))) {
                     e.preventDefault();
                }
                         
        });
            //To display the error message if input doesn't match email Id format
            angular.element(element).bind('blur', function() {
            var value = this.value;
            if(emailRegexp.test(value)) {
                    // Valid input
                    angular.element(this).next().css('display','none');  
                } else {
                    // Invalid input  
                    angular.element(this).next().css('display','block');
                                      
                }
            });    
        }            
    }        
});