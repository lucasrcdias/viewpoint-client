(function () {
  angular
    .module("viewpoint.directives")
    .directive("vpAlert", vpAlert);

  function vpAlert () {
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

    function vpAlertCtrl ($rootScope, $timeout) {
      var vm    = this;
      var timer = undefined;

      $rootScope.$on("alert:display", alertDisplayHandler);

      function alertDisplayHandler (event, alert) {
        if (alert) {
          $timeout(function () {
            vm.message = alert.message;
            vm.type    = "alert--" + alert.type;
            vm.display = true;

            if (timer) {
              $timeout.cancel(timer);
            }

            timer = $timeout(hideAlert, 5000);
          }, 0);
        }
      }

      function hideAlert () {
        vm.display = false;
        vm.message = undefined;
        vm.type    = undefined;
      }
    }
  }
})();
