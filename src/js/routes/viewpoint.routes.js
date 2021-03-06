(function () {
  angular
    .module('viewpoint.routes')
    .config(viewpointRoutes);

  viewpointRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];

  function viewpointRoutes ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");

    $stateProvider
      .state("home", {
        url: "/home",
        templateUrl: "/views/home.html",
        controller: "homeCtrl",
        controllerAs: "vm",
        bindToController: true,
        resolve: {
          authenticate: function (authenticationService) {
            authenticationService.notAuthenticated(false);
          }
        }
      })
      .state("signup", {
        url: "/cadastre-se",
        templateUrl: "/views/signup.html",
        controller: "signupCtrl",
        controllerAs: "vm",
        bindToController: true,
        resolve: {
          authenticate: function (authenticationService) {
            authenticationService.notAuthenticated();
          }
        }
      })
      .state("signin", {
        url: "/entrar",
        templateUrl: "/views/signin.html",
        controller: "signinCtrl",
        controllerAs: "vm",
        bindToController: true,
        resolve: {
          authenticate: function (authenticationService) {
            authenticationService.notAuthenticated();
          }
        }
      })
      .state("passwordRecovery", {
        url: "/recuperar-senha",
        templateUrl: "/views/password-recovery.html",
        controller: "passwordRecoveryCtrl",
        controllerAs: "vm",
        bindToController: true,
        resolve: {
          authenticate: function (authenticationService) {
            authenticationService.notAuthenticated();
          }
        }
      })
      .state("userUpdate", {
        url: "/atualizar-dados",
        templateUrl: "/views/user-update.html",
        controller: "userUpdateCtrl",
        controllerAs: "vm",
        bindToController: true,
        resolve: {
          authenticate: function (authenticationService) {
            authenticationService.isAuthenticated();
          }
        }
      })
      .state("passwordUpdate", {
        url: "/atualizar-senha",
        templateUrl: "/views/password-update.html",
        controller: "passwordUpdateCtrl",
        controllerAs: "vm",
        bindToController: true,
        resolve: {
          authenticate: function (authenticationService) {
            authenticationService.isAuthenticated();
          }
        }
      })
      .state("dashboard", {
        url: "/dashboard?group",
        templateUrl: "/views/dashboard.html",
        controller: "dashboardCtrl",
        controllerAs: "vm",
        bindToController: true,
        reloadOnSearch: false,
        resolve: {
          groups: function (groupsService) {
            return groupsService.getGroups();
          },
          authenticate: function (authenticationService) {
            authenticationService.isAuthenticated();
          },
          group: function ($stateParams) {
            return $stateParams.group;
          }
        }
      })
      .state("signout", {
        url: "/sair",
        controller: "signoutCtrl",
        controllerAs: "vm",
        bindToController: true
      });
  };
})();
