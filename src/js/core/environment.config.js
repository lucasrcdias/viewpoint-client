(function() {
  angular
    .module('viewpoint.core')
    .config(environmentProvider);

    environmentProvider.$inject = ['envServiceProvider'];

    function environmentProvider(envServiceProvider) {
      envServiceProvider.config({
        domains: {
          development: ['localhost'],
          production:  ['viewpoint.com.br']
        },

        vars: {
          development: {
            apiURL: '//localhost:3000/v1',
            baseURL: '//localhost:3000'
          },
          production: {
            apiURL: '//viewpoint.com.br/api/v1',
            baseURL: '//viewpoint.com.br'
          }
        }
      });

      envServiceProvider.check();
    }
})();
