(function () {
  angular
    .module("viewpoint.controllers")
    .controller("signupCtrl", signupCtrl);

  function signupCtrl() {
    var vm = this;
    console.log("Signup route ok!");
  };
})();
