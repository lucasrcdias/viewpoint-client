(function () {
  angular
    .module("viewpoint.directives")
    .directive("vpErrorMessages", vpErrorMessages);

  function vpErrorMessages () {
    var directive = {
      templateUrl: "views/directives/vp-error-messages.html",
      restrict: "E",
      scope: {
        errors: "=",
        isDirty: "="
      },
      controller: ImMessagesController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function ImMessagesController() {
      var vm = this;
    }
  }
})();
