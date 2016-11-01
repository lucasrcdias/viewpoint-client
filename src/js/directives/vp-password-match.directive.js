(function () {
  angular
    .module("viewpoint.directives")
    .directive("vpPasswordMatch", vpPasswordMatch);

  function vpPasswordMatch () {
    var directive = {
      restrict: "A",
      require: 'ngModel',
      scope: {
        password: '=vpPasswordMatch'
      },
      link: linkFunction
    };

    return directive;

    function linkFunction (scope, element, attributes, ngModel) {
      ngModel.$validators.passwordMatch = function (modelValue) {
        return modelValue === scope.password;
      };

      scope.$watch('password', function () {
        ngModel.$validate();
      });
    }
  }
})();
