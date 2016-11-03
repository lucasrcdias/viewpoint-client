(function () {
  angular
    .module('viewpoint.core')
    .factory('httpInterceptor', httpInterceptor);

  httpInterceptor.$inject = ['$q', 'SatellizerConfig', 'SatellizerStorage', 'SatellizerShared', 'lodash', 'envService'];

  function httpInterceptor ($q, config, storage, shared, lodash, envService) {
    return {
      request: request
    };

    function request (request) {
      var isAPIRequest = lodash.startsWith(request.url, envService.read("apiURL"));

      if (isAPIRequest && shared.isAuthenticated()) {
        var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;
        var token = storage.get(tokenName);

        if (config.tokenType) {
          token = config.tokenType + ' ' + token;
        }

        request.headers[config.tokenHeader] = token;
      }

      return request;
    }
  };
})();
