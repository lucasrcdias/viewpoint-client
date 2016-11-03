(function () {
  angular
    .module("viewpoint.services")
    .factory("groupsService", groupsService);

  groupsService.$inject = ["$http", "$q", "envService"];

  function groupsService($http, $q, envService) {
    var apiURL  = envService.read("apiURL");
    var service = {
      getGroups: getGroups,
      getEvents: getEvents
    };

    return service;

    function getGroups () {
      return $http.get(apiURL + "/action/findGroupsByUser")
        .then(onSuccess)
        .catch(onFailure);
    }

    function getEvents (group) {
      return $http.get(apiURL + "/action/findActionsByGroup?group=" + group.name)
        .then(onSuccess)
        .catch(onFailure);
    }

    function onSuccess (response) {
      return response;
    }

    function onFailure (error) {
      return $q.reject(error);
    }
  };
})();
