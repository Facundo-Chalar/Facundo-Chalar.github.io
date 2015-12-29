angular.module('comics').directive('passwordConfirm', ['$parse', function ($parse) {
 return {
    restrict: 'A',
    scope: {
      matchTarget: '=',
    },
    require: 'ngModel',
    link: function link(scope, elem, attrs, ctrl) {
      var validator = function (value) {
        ctrl.$setValidity('match', value === scope.matchTarget);
        return value;
      }
      ctrl.$parsers.unshift(validator);
      ctrl.$formatters.push(validator);
      scope.$watch('matchTarget', function(newval, oldval) {
        validator(ctrl.$viewValue);
      });
    }
  };
}]);

angular.module('comics').directive('checkUser', ['$parse','UserService', function ($parse,UserService) {
 return {
    restrict: 'A',
    scope: {
      usernickname: '=',
    },
    require: 'ngModel',
    link: function link(scope, elem, attrs, ctrl) {
      var validator = function (value) {
//ctrl.$setValidity('existentuser',true);
  ctrl.$setValidity('existentuser', !UserService.userExists(value.toLowerCase()));
        return value;
      }
      ctrl.$parsers.unshift(validator);
      ctrl.$formatters.push(validator);
      scope.$watch('usernickname', function(newval, oldval) {
        validator(ctrl.$viewValue);
      });
    }
  };
}]);
