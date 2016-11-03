(function () {
  angular
    .module("viewpoint.controllers")
    .controller("signinCtrl", signinCtrl);

  signinCtrl.$inject = ["userService", "errorsService", "$auth", "$state"];

  function signinCtrl (userService, errorsService, $auth, $state) {
    var vm = this;

    vm.user = {};

    vm.fieldErrors      = fieldErrors;
    vm.signinFormSubmit = signinFormSubmit;

    function signinFormSubmit (user) {
      return $auth.login({ "user": user })
        .then(authCompleted)
        .catch(authFailed)
        .finally(clearPassword);
    }

    function authCompleted (response) {
      userService.saveApiKey(response.data.key);

      $state.go("dashboard");
    }

    function authFailed (error) {
      vm.user.errors = errorsService.parse(error.data);
    }

    function clearPassword () {
      vm.user.password = "";
      vm.signinForm.$setPristine();
    }

    function fieldErrors (field) {
      return errorsService.normalize(vm.signinForm, vm.user, field);
    }
  }
})();
