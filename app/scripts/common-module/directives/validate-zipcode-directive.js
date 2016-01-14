/* directive for validating zip code
*/
angular.module('myMPCSApp.zipCodeValidation',[])
  .directive('validateZipcode', function () {
    //Regular expression for zipcode
    var zipRegexp = /^\d{1,10}$/;
  
    return {
        restrice: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs) {
        
            angular.element(element).bind('keydown', function (e) {
                var code = e.keyCode || e.which;
               if(((code<48 || code > 57) ||(e.shiftKey && (code>47 || code < 58))) && code !==8 && code !==46 ) {
                     e.preventDefault();
                }
            
        });
                  
        }            
    }        
});