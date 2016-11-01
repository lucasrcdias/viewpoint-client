(function () {
  angular
    .module("viewpoint.controllers")
    .controller("userUpdateCtrl", userUpdateCtrl);

  userUpdateCtrl.$inject = ["userService", "errorsService", "$state", "alertService"];

  function userUpdateCtrl (userService, errorsService, $state, alertService) {
    var vm = this;

    vm.user = {};

    vm.fieldErrors        = fieldErrors;
    vm.updateFormSubmit = updateFormSubmit;

    loadUser();

    function updateFormSubmit (user) {
      return userService.update(user)
        .then(onSuccess)
        .catch(onFailure)
        .finally(clearPassword);
    }

    function loadUser () {
      return userService.findByApiKey(userService.getApiKey())
        .then(userLoaded);
    }

    function userLoaded (response) {
      vm.user = response.data;
    }

    function onSuccess (response) {
      alertService.success("Dados atualizados com sucesso!");

      $state.go("dashboard");
    }

    function onFailure (error) {
      vm.user.errors = errorsService.parse(error.data);
    }

    function clearPassword () {
      vm.user.password = "";
      vm.user.passwordConfirmation = "";

      vm.updateForm.$setPristine();
    }

    function fieldErrors (field) {
      return errorsService.normalize(vm.updateForm, vm.user, field);
    }
  }
})();
