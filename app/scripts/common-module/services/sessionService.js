
angular.module('myMPCSApp.sessionService', []).service('SessionService', function() {

// flag to check that sessionStorage is supported or not
var isSessionStorageSupported = false;
if (typeof(sessionStorage) != 'undefined') {
  isSessionStorageSupported = true;
}

  if (isSessionStorageSupported) {
    //save method adds the new key value pair
    this.save = function(key,value) {
      sessionStorage.setItem(key,value);
    }

    //simply search list for given key
    //and returns value if found
    this.getItem = function(key) {
      var value = sessionStorage.getItem(key);
      return value;
    }

    //iterate through  list and delete
    // if found
    this.removeItem = function(key) {
      sessionStorage.removeItem(key);
    }

    //remove all items
    this.removeAll = function() {
      sessionStorage.clear();
    }
  }
});
