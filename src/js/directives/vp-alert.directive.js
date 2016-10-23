(function () {
  angular
    .module("viewpoint.directives")
    .directive("vpAlert", vpAlert);

  function vpAlert() {
    var directive = {
      restrict: "E",
      scope: {},
      templateUrl: "views/directives/vp-alert.html",
      controller: vpAlertCtrl,
      controllerAs: "vm",
      bindToController: true
    };

    vpAlertCtrl.$inject = ["$rootScope", "$timeout"];

    return directive;

    function vpAlertCtrl($rootScope, $timeout) {
      var vm = this;

      $rootScope.$on("alert:display", alertDisplayHandler);

      function alertDisplayHandler(event, alert) {
        if (alert) {
          vm.message = alert.message;
          vm.type    = "alert--" + alert.type;
          vm.display = true;

          $timeout(hideAlert, 5000);
          $rootScope.$apply();
        }
      };

      function hideAlert() {
        vm.display = false;
        vm.message = undefined;
        vm.type    = undefined;
      };
    };
  };
})();
