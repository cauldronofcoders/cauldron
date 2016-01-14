
angular.module('myMPCSApp.service',[])
.service("sortService", function() {


 var fileName="";
 

  /*
  @name getFileName
  @description returns the appropriate JSON file as per selection of radio button
  */
    
  this.getFileName = function(radioValue) {
    
    switch (radioValue) {
      case 'Low to High':
        fileName="scripts/common-module/model/mock-data/lowToHigh";
        break;

      case 'High to Low':
       fileName="scripts/common-module/model/mock-data/hightoLow";
        break;

      case 'Earlier dates first':
        fileName="scripts/common-module/model/mock-data/earlierDatesFirst";
        break;

      case 'Later dates first':
        fileName="scripts/common-module/model/mock-data/laterDatesFirst";
        break;

    }
    fileName= fileName.concat('.json'); 
      return fileName;
  };
  
 
  
 


});