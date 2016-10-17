(function () {
  angular
    .module("viewpoint.controllers")
    .controller("signupCtrl", signupCtrl);

  signupCtrl.$inject = ["userService"];

  function signupCtrl(userService) {
    var vm = this;

    vm.signupFormSubmit = signupFormSubmit;

    function signupFormSubmit(user) {
      return userService.create(user)
        .then(userCreated)
        .catch(userCreationFail)
        .finally(signupFormReset);
    }

    function userCreated(response) {
      console.log(response);
    };

    function userCreationFail(error) {
      console.log(error);
    };

    function signupFormReset() {
      vm.user.password = "";
      vm.user.passwordConfirmation = "";

      vm.signupForm.$setPristine();
    }
  };
})();
