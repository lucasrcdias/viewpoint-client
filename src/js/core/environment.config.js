(function () {
  angular
    .module('viewpoint.core')
    .config(environmentProvider);

    environmentProvider.$inject = ['envServiceProvider'];

    function environmentProvider (envServiceProvider) {
      envServiceProvider.config({
        domains: {
          development: ['localhost'],
          production:  ['viewpoint.com.br']
        },

        vars: {
          development: {
            apiURL: '//localhost:8080/viewpoint/api',
            baseURL: '//localhost:8080'
          },
          production: {
            apiURL: '//viewpoint.com.br/viewpoint/api',
            baseURL: '//viewpoint.com.br'
          }
        }
      });

      envServiceProvider.check();
    }
})();
