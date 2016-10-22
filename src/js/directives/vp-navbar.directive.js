(function () {
  angular
    .module("viewpoint.directives")
    .directive("vpNavbar", vpNavbar);

  vpNavbar.$inject = ["alertService"];

  function vpNavbar(alertService) {
    var directive = {
      restrict: "A",
      link: linkFunction
    };

    function linkFunction (scope, element, attributes) {
      var el = element[0];

      var menu          = el.querySelector(".js-menu");
      var submenuToggle = el.querySelector(".js-submenu-toggle");
      var container     = el.querySelector(".js-container");
      var toggleIcon    = submenuToggle.querySelector(".js-toggle-icon");
      var submenu       = el.querySelector(".js-submenu");
      var mobileMenu    = el.querySelector(".js-mobile-menu");
      var apiBox        = el.querySelector(".js-api-wrapper");

      var openedSubmenuClass     = "nav__menu__submenu--opened";
      var visibleMobileMenuClass = "nav__mobile--visible";

      var apiClipboard = new Clipboard(".js-api-key-btn");

      apiClipboard.on('success', function(event) {
        alertService.success("Chave copiada, basta copiá-la para o local desejado!");
      });

      window       .addEventListener("resize", windowResized);
      submenuToggle.addEventListener("click", submenuToggleClick);

      function submenuToggleClick (event) {
        toggleIcon.classList.toggle("fa-bars");
        toggleIcon.classList.toggle("fa-times");

        if (window.innerWidth < 768) {
          mobileMenu.classList.toggle(visibleMobileMenuClass);
          return;
        }

        submenu.classList.toggle(openedSubmenuClass);
      };

      function windowResized (event) {
        if (window.innerWidth < 768) {
          mobileMenu.appendChild(submenu);
          mobileMenu.appendChild(apiBox);
          return;
        }

        container.appendChild(apiBox);
        menu.appendChild(submenu);
      };

      windowResized();
    };

    return directive;
  };
})();
