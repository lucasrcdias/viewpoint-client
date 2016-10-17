(function() {
  angular
    .module('viewpoint.routes')
    .config(viewpointRoutes);

  viewpointRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];

  function viewpointRoutes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");

    $stateProvider
      .state("home", {
        url: "/home",
        templateUrl: "/views/home.html",
        controller: "homeCtrl",
        controllerAs: "vm",
        bindToController: true
      })
      .state("signup", {
        url: "/cadastre-se",
        templateUrl: "/views/signup.html",
        controller: "signupCtrl",
        controllerAs: "vm",
        bindToController: true
      });
  };
})();