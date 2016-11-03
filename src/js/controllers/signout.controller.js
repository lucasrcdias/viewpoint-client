(function () {
  angular
    .module("viewpoint.controllers")
    .controller("signoutCtrl", signoutCtrl);

  signoutCtrl.$inject = ["$auth", "$state", "userService"];

  function signoutCtrl ($auth, $state, userService) {
    var vm = this;

    logout();

    function logout () {
      $auth.logout();
      userService.removeApiKey();

      $state.go("signin");
    }
  }
})();
