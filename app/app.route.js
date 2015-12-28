angular.module('comics')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        template: "<a href='#/register'>Register</a>"
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
