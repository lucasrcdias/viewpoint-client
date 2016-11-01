(function () {
  angular
    .module("viewpoint.directives")
    .directive("vpApiKey", vpApiKey);

  vpApiKey.$inject = ["userService"];

  function vpApiKey (userService) {
    var directive = {
      "restrict": "A",
      "link": linkFunction
    }

    return directive;

    function linkFunction (scope, element, attributes) {
      element[0].value = userService.getApiKey();
    }
  }
})();
