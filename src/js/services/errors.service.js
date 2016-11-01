(function () {
  angular
    .module("viewpoint.services")
    .factory("errorsService", errorsService);

  function errorsService () {
    var service = {
      normalize: normalize,
      parse: parse
    }

    return service;

    function normalize (form, model, attribute) {
      if (form && model && attribute) {
        var errors = {};

        if (form[attribute]) {
          errors = form[attribute].$error;
        }

        if (model.errors) {
          errors["model"] = model.errors[attribute];
        } else {
          errors["model"] = undefined;
        }

        return errors;
      }

      return {};
    }

    function parse (errors) {
      var parsed = {};

      angular.forEach(errors, function (value, key) {
        parsed[value.field.toLowerCase()] = value.message;
      });

      return parsed;
    }
  }
})();
