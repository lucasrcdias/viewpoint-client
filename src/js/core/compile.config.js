(function () {
  angular
    .module("viewpoint.core")
    .config(compileConfig);

  compileConfig.$inject = ["$compileProvider"];

  function compileConfig ($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
  }
})();
