(function() {
  angular
    .module('viewpoint.core')
    .config(viewpointRoutes);

  viewpointRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];

  function viewpointRoutes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");

    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "home.html",
        controller: "homeCtrl",
        controllerAs: "vm",
        bindToController: true
      });
  };
})();
