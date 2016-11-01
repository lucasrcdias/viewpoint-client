(function () {
  angular
    .module("viewpoint.services")
    .factory("alertService", alertService);

  alertService.$inject = ["$rootScope"];

  function alertService ($rootScope) {
    var service = {
      success: success,
      error: error,
      warning: warning
    };

    return service;

    function success (message) {
      displayAlert(message, "success");
    }

    function error (message) {
      displayAlert(message, "error");
    }

    function warning (message) {
      displayAlert(message, "warning");
    }

    function displayAlert (message, type) {
      var alert = {
        "message": message,
        "type": type
      };

      $rootScope.$emit("alert:display", alert);
    }
  }
})();
