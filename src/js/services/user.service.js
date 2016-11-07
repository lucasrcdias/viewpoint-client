(function () {
  angular
    .module("viewpoint.services")
    .factory("userService", userService);

  userService.$inject = ["$http", "$q", "envService"];

  function userService ($http, $q, envService) {
    var apiUrl  = envService.read("apiURL");
    var service = {
      get: get,
      update: update,
      remove: remove,
      recoverPassword: recoverPassword,
      saveApiKey: saveApiKey,
      getApiKey: getApiKey,
      findByApiKey: findByApiKey,
      removeApiKey: removeApiKey
    };

    return service;

    function update (user) {
      return $http.put(apiUrl + "/user/update", { "user": user })
        .then(onSuccess)
        .catch(onFailure);
    }

    function remove (user) {
      return $http.delete(apiUrl + "/user/delete")
        .then(onSuccess)
        .catch(onFailure);
    }

    function recoverPassword (user) {
      return $http.post(apiUrl + "/user/passwordRecovery?email=" + user.email)
        .then(onSuccess)
        .catch(onFailure);
    }

    function findByApiKey (key) {
      return $http.get(apiUrl + "/user/findByKey?key=" + key)
        .then(onSuccess)
        .catch(onFailure);
    }

    function get (id) {
      return $http.get(apiUrl + "/user/show")
        .then(onSuccess)
        .catch(onFailure);
    }

    function saveApiKey (key) {
      localStorage["api_key"] = key;

      return key;
    }

    function getApiKey (key) {
      return localStorage["api_key"];
    }

    function removeApiKey () {
      localStorage.removeItem("api_key");
    }

    function onSuccess (response) {
      return response;
    }

    function onFailure (error) {
      return $q.reject(error);
    }
  }
})();
