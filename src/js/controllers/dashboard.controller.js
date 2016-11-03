(function () {
  angular
    .module("viewpoint.controllers")
    .controller("dashboardCtrl", dashboardCtrl);

  dashboardCtrl.$inject = ["groupsService", "groups", "alertService"];

  function dashboardCtrl (groupsService, groups, alertService) {
    var vm = this;

    vm.events = [];
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
      vm.events = response.data;
    }

    function onFailure (error) {
      alertService.error("Ocorreu um erro ao filtrar, tente novamente mais tarde...");
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
