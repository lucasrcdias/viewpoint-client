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
      vm.events        = setEvents(response.data, getMaxOcurrences(response.data));
      vm.groupName     = response.data[0].group;
      vm.displayReport = true;
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

    function getMaxOcurrences (events) {
      var max = 0;

      angular.forEach(events, function (event) {
        if (event.total > max) {
          max = event.total;
        }
      });

      return max;
    }

    function setEvents (events, max) {
      angular.forEach(events, function (event) {
        event.percentage = calculatePercentage(event, max);
        event.status     = setEventStatus(event);
      });

      return events;
    }

    function calculatePercentage (event, max) {
      return Math.floor((event.total * 100) / max);
    }

    function setEventStatus (event) {
      if (event.percentage >= 60) {
        return "good";
      }

      if (event.percentage < 60 && event.percentage >= 30) {
        return "average";
      }

      return "bad";
    }
  }
})();
