(function () {
  angular
    .module("viewpoint.controllers")
    .controller("passwordRecoveryCtrl", passwordRecoveryCtrl);

  passwordRecoveryCtrl.$inject = ["userService"];

  function passwordRecoveryCtrl (userService) {
    var vm = this;
  }
})();
