angular.module('comics')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl:'component/login/login.html'
      })
      .when('/register',{
        templateUrl:'component/register/register-dialog.html'
      })
      .when('/login',{
        templateUrl:'component/login/login.html'
      }).when('/404',{
        templateUrl:'shared/404.html'
      }).otherwise({
      redirectTo:'/404'
        }
      );
  });
