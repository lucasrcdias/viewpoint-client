(function () {
  angular
    .module("viewpoint.controllers")
    .controller("signupCtrl", signupCtrl);

  signupCtrl.$inject = ["$auth", "errorsService"];

  function signupCtrl ($auth, errorsService) {
    var vm = this;

    vm.user = {};

    vm.fieldErrors      = fieldErrors;
    vm.signupFormSubmit = signupFormSubmit;

    function signupFormSubmit (user) {
      return $auth.signup(user)
        .then(userCreated)
        .catch(userCreationFail)
        .finally(signupFormReset);
    }

    function userCreated (response) {
      console.log(response);
    }

    function userCreationFail (error) {
      console.log(error);
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
