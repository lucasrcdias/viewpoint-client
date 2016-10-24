(function () {
  angular
    .module("viewpoint.services")
    .factory("userService", userService);

  userService.$inject = ["$http", "$q", "envService"];

  function userService ($http, $q, envService) {
    var apiUrl  = envService.read("apiURL");
    var service = {
      get: get,
      create: create,
      update: update,
      remove: remove,
      recoverPassword: recoverPassword
    };

    return service;

    function create (user) {
      return $http.post(apiUrl + "/user/create", user)
        .then(onSuccess)
        .catch(onFailure);
    }

    function update (user) {
      return $http.put(apiUrl + "/user/update", user)
        .then(onSuccess)
        .catch(onFailure);
    }

    function remove (user) {
      return $http.delete(apiUrl + "/user/delete")
        .then(onSuccess)
        .catch(onFailure);
    }

    function recoverPassword (user) {
      // TODO: Atualizar quando for implementada a API para recuperação de senha
      return $http.post(apiUrl + "/user/password-recovery")
        .then(onSuccess)
        .catch(onFailure);
    }

    function get (id) {
      return $http.get(apiUrl + "/user/show")
        .then(onSuccess)
        .catch(onFailure);
    }

    function onSuccess (response) {
      return response;
    }

    function onFailure (error) {
      return $q.reject(error);
    }
  }
})();
