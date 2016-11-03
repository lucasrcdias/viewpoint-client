(function () {
  angular
    .module("viewpoint.controllers")
    .controller("dashboardCtrl", dashboardCtrl);

  dashboardCtrl.$inject = ["groupsService", "groups"];

  function dashboardCtrl (groupsService, groups) {
    var vm = this;

    vm.groups = normalizeGroups(groups);

    vm.groupSearch  = groupSearch;
    vm.filterEvents = filterEvents;

    function filterEvents (group) {
      return groupsService.getEvents(group.originalObject)
        .then(onSuccess)
        .catch(onFailure);
    }

    function groupSearch (query) {
      if (!vm.groups.length) {
        return [];
      }

      return vm.groups.filter(function(group) {
        return normalizedName(group.name).search(query) !== -1;
      });
    }

    function normalizedName (name) {
      return name.removeDiacritics().toLowerCase();
    }

    function onSuccess (response) {
      console.log(response.data);
    }

    function onFailure (error) {
      console.log(error);
    }

    function normalizeGroups (groups) {
      var userGroups = groups.data.groups;
      var normalizedGroups = [];

      angular.forEach(userGroups, function (group) {
        normalizedGroups.push({ "name": group });
      });

      return normalizedGroups;
    }
  }
})();
