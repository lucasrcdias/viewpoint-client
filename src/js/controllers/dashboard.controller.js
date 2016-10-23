(function () {
  angular
    .module("viewpoint.controllers")
    .controller("dashboardCtrl", dashboardCtrl);

  dashboardCtrl.$inject = ["groups"];

  function dashboardCtrl (groups) {
    var vm = this;

    vm.groups = groups;

    vm.groupSearch = groupSearch;

    function groupSearch (query) {
      return vm.groups.filter(function(group) {
        return normalizedName(group.name).search(query) !== -1;
      });
    };

    function normalizedName(name) {
      return name.removeDiacritics().toLowerCase();
    };
  };
})();
