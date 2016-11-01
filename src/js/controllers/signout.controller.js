(function () {
  angular
    .module("viewpoint.controllers")
    .controller("signoutCtrl", signoutCtrl);

  signoutCtrl.$inject = ["$auth", "$state"];

  function signoutCtrl ($auth, $state) {
    var vm = this;

    logout();

    function logout () {
      $auth.logout();

      $state.go("signin");
    }
  }
})();
