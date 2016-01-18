angular.module('myMPCSApp.sessionController', []).controller('SessionController', function($scope, SessionService) {
  $scope.saveContact = function() {
    $scope.isSaveClicked = true;
    SessionService.save($scope.newcontact.key,$scope.newcontact.value);
    $scope.newcontact = {};

  }

  $scope.getItem = function() {
    $scope.isGetClicked = false;
    $scope.isSaveClicked = false;
    $scope.searchResult = SessionService.getItem($scope.newcontact.key);
    if ($scope.searchResult !== "" && $scope.searchResult !== null) {
      $scope.isRemoved = false;
      $scope.isGetClicked = true;
    }
  }

  $scope.remove = function(key) {
    $scope.isRemoved = false;
    $scope.isSaveClicked = false;
    SessionService.removeItem($scope.newcontact.key);
    $scope.searchResult = '';
    $scope.isRemoved = true;
    $scope.isGetClicked = false;
    if ($scope.newcontact.key == key) $scope.newcontact = {};
  }

  $scope.removeAll = function() {

    SessionService.removeAll();
    $scope.isRemoved = false;
    $scope.isSaveClicked = false;
    $scope.isGetClicked = false;
    $scope.newcontact = {};
  }

})
