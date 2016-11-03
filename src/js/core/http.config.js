(function () {
  angular
    .module('viewpoint.core')
    .config($httpProviderConfig);

  $httpProviderConfig.$inject = ['$httpProvider'];

  function $httpProviderConfig ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
  }
})();
