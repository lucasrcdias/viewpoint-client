(function () {
  angular
    .module("viewpoint.controllers")
    .controller("passwordRecoveryCtrl", passwordRecoveryCtrl);

  passwordRecoveryCtrl.$inject = ["userService", "alertService", "errorsService", "$state"];

  function passwordRecoveryCtrl (userService, alertService, errorsService, $state) {
    var vm = this;

    vm.user = {};

    vm.fieldErrors        = fieldErrors;
    vm.recoveryFormSubmit = recoveryFormSubmit;

    function recoveryFormSubmit (user) {
      return userService.recoverPassword(user)
        .then(onSuccess)
        .catch(onFailure);
    }

    function onSuccess (response) {
      alertService.success("E-mail enviado com sucesso! Verifique sua caixa de entrada e o spam.");

      $state.go("signin");
    }

    function onFailure (error) {
      vm.user.errors = errorsService.parse(error.data);
    }

    function fieldErrors (field) {
      return errorsService.normalize(vm.recoveryForm, vm.user, field);
    }
  }
})();
