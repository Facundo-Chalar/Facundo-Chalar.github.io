angular.module('comics')
.controller('loginController', function($scope, $mdDialog, $mdMedia,$localStorage,$filter,UserService) {
  $scope.status = '  ';
  $scope.userList=[];

  $scope.$storage=$localStorage;


  $scope.checkLogin=function(user){
    UserService.checkLogin(user.nickname,user.password);
  };

  $scope.showAdvanced = function(ev) {
    //Register Dialog config
    $mdDialog.show({
      controller: DialogController,
      templateUrl: '/component/register/register-dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: true
    })
    .then(function(user) {
      //Register acepted
      UserService.addUser(user);
    }, function() {
      //Register Cancelled
      //Todo volver a login si esta por /register o cerrar dialog si esta en Pop-Up
    });    
  };

});
function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.registerUser = function(user) {
    $mdDialog.hide(user);
  };
}
