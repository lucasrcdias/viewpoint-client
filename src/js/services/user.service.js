(function() {
  angular
    .module("viewpoint.services")
    .factory("userService", userService);

  userService.$inject = ["$http", "$q", "envService"];

  function userService($http, $q, envService) {
    var apiUrl  = envService.read("apiURL");
    var service = {
      create: create,
      update: update,
      remove: remove,
      recoverPassword: recoverPassword,
      get: get
    };

    return service;

    function create(user) {
      return $http.post(apiUrl + "/user/create", { "user": user })
        .then(onSuccess)
        .catch(onFailure);
    }

    function update(user) {
      return $http.put(apiUrl + "/user/update", { "user": user })
        .then(onSuccess)
        .catch(onFailure);
    }

    function remove(user) {
      return $http.delete(apiUrl + "/user/delete")
        .then(onSuccess)
        .catch(onFailure);
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
