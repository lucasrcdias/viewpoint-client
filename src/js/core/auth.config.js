(function () {
  angular
    .module("viewpoint.core")
    .config($authProvider);

  $authProvider.$inject = ["$authProvider", "envServiceProvider"];

  function $authProvider ($authProvider, envServiceProvider) {
    var envService = envServiceProvider.$get();
    var apiURL     = envService.read("apiURL");

    $authProvider.httpInterceptor = false;
    $authProvider.tokenRoot   = "";
    $authProvider.tokenName   = "key";
    $authProvider.tokenPrefix = "";

    $authProvider.loginUrl  = apiURL + '/sessions';
    $authProvider.signupUrl = apiURL + '/user/create';
  }
})();
