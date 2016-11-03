(function () {
  angular
    .module("viewpoint.controllers")
    .controller("signupCtrl", signupCtrl);

  signupCtrl.$inject = ["$auth", "$state", "userService", "errorsService"];

  function signupCtrl ($auth, $state, userService, errorsService) {
    var vm = this;

    vm.user = {};

    vm.fieldErrors      = fieldErrors;
    vm.signupFormSubmit = signupFormSubmit;

    function signupFormSubmit (user) {
      return $auth.signup({ "user": user })
        .then(userCreated)
        .catch(userCreationFail)
        .finally(signupFormReset);
    }

    function userCreated (response) {
      userService.saveApiKey(response.data.key);
      $auth.setToken(response.data.token);
      $state.go("dashboard");
    }

    function userCreationFail (error) {
      vm.user.errors = errorsService.parse(error.data);
    }

    function signupFormReset () {
      vm.user.password = "";
      vm.user.passwordConfirmation = "";

      vm.signupForm.$setPristine();
    }

    function fieldErrors (field) {
      return errorsService.normalize(vm.signupForm, vm.user, field);
    }
  }
})();
