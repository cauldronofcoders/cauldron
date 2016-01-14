
angular.module('myMPCSApp.service',[])
.service("sortService", function(URL_CONST) {
 var fileName="";
  /*
  @name getFileName
  @description returns the appropriate JSON file as per selection of radio button
  */
    
  this.getFileName = function(radioValue) {
    switch (radioValue) {
      case 'Low to High':
        fileName = URL_CONST.LOW_TO_HIGH;
        break;

      case 'High to Low':
       fileName = URL_CONST.HIGH_TO_LOW;
        break;

      case 'Earlier dates first':
        fileName = URL_CONST.EARLIER_DATES_FIRST;
        break;

      case 'Later dates first':
        fileName = URL_CONST.LATER_DATES_FIRST;
        break;
    }
      return fileName;
  };
});
