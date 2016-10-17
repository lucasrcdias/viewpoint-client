(function() {
  angular
    .module("viewpoint.controllers")
    .controller("passwordUpdateCtrl", passwordUpdateCtrl);

  passwordUpdateCtrl.$inject = ["userService"];

  function passwordUpdateCtrl(userService) {
    var vm = this;
  };
})();
