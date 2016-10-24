(function () {
  angular
    .module("viewpoint.controllers")
    .controller("signupCtrl", signupCtrl);

  signupCtrl.$inject = ["$auth"];

  function signupCtrl ($auth) {
    var vm = this;

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
  }
})();
