(function () {
  angular
    .module("viewpoint.services")
    .factory("authenticationService", authenticationService);

  authenticationService.$inject = ["$auth", "$q", "$state", "$timeout", "alertService"];

  function authenticationService ($auth, $q, $state, $timeout, alertService) {
    var service = {
      isAuthenticated: isAuthenticated,
      notAuthenticated: notAuthenticated
    };

    return service;

    function isAuthenticated () {
      if ($auth.isAuthenticated()) {
        return $q.when();
      }

      $timeout(function () {
        $state.go("signin");

        alertService.error("Faça o login para continuar");
      })

      return $q.reject();
    }

    function notAuthenticated () {
      if ($auth.isAuthenticated()) {
        $timeout(function () {
          $state.go("dashboard");

          alertService.success("Você já está logado!");
        })

        return $q.reject();
      }

      return $q.when();
    }
  }
})();
