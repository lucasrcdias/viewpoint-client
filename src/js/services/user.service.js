(function() {
  angular
    .module("viewpoint.services")
    .factory("userService", userService);

  userService.$inject = ["$http", "$q"];

  function userService($http, $q) {
    var service = {
      create: create,
      update: update,
      remove: remove,
      recoverPassword: recoverPassword,
      get: get
    };

    return service;

    function create(user) {
      console.log(user);
    }

    function update(user) {
      console.log(user);
    }

    function remove(user) {
      console.log(user);
    }

    function recoverPassword(user) {
      console.log(user);
    }

    function get(id) {
      console.log(user);
    }

    function onSuccess(response) {
      return response;
    }

    function onFailure(error) {
      return $q.reject(error);
    }
  }
})();
