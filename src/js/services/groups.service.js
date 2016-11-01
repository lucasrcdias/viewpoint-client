(function () {
  angular
    .module("viewpoint.services")
    .factory("groupsService", groupsService);

  function groupsService() {
    var service = {
      getGroups: getGroups
    };

    return service;

    function getGroups () {
      return [
        {
          id: 1,
          name: "Página de busca"
        },
        {
          id: 2,
          name: "Página de compra"
        },
        {
          id: 3,
          name: "Página de cadastro"
        },{
          id: 4,
          name: "Página incial"
        }
      ];
    }
  };
})();
