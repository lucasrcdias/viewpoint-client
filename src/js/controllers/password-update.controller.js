(function () {
  angular
    .module("viewpoint.controllers")
    .controller("passwordUpdateCtrl", passwordUpdateCtrl);

  passwordUpdateCtrl.$inject = ["userService", "errorsService", "$state", "alertService"];

  function passwordUpdateCtrl (userService, errorsService, $state, alertService) {
    var vm = this;

    vm.user = {};

    vm.fieldErrors        = fieldErrors;
    vm.passwordFormSubmit = passwordFormSubmit;

    function passwordFormSubmit (user) {
      return userService.update(user)
        .then(onSuccess)
        .catch(onFailure)
        .finally(clearPassword);
    }

    function onSuccess (response) {
      alertService.success("Sua senha foi alterada com sucesso!");

      $state.go("dashboard");
    }

    function onFailure (error) {
      vm.user.errors = errorsService.parse(error.data);
    }

    function clearPassword () {
      vm.user.password = "";
      vm.user.passwordConfirmation = "";

      vm.passwordForm.$setPristine();
    }

    function fieldErrors (field) {
      return errorsService.normalize(vm.passwordForm, vm.user, field);
    }
  }
})();
