angular.module('comics')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        template: "<a href='#/register'>Register</a>"
      })
      .when('/register', {
        template: "<a href='#/'>Home</a>"
      });
  });
