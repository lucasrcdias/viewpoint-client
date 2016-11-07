(function () {
  angular
    .module("viewpoint.directives")
    .directive("vpReport", vpReport);

  function vpReport () {
    var directive = {
      "restrict": "EA",
      "scope": {
        "data": "=",
        "group": "@"
      },
      "link": linkFunction
    }

    return directive;

    function linkFunction (scope, element, attributes) {
      if (!google) { return; }

      var $el = element[0];

      google.charts.load('current', { 'packages': ['corechart'] });
      google.charts.setOnLoadCallback(drawChart);

      window.addEventListener("resize", drawChart);

      scope.$watch("data", function () {
        drawChart();
      });

      function drawChart () {
        console.log("Drawning...");
        if (!scope.data || !scope.data.length) { return; }

        var events  = parsedEvents(scope.data);
        var width   = $el.offsetWidth;
        var data    = google.visualization.arrayToDataTable(events);
        var options = {
          "title": "Eventos do grupo " + scope.group,
          "width": width
        }

        console.log(width);

        var chart = new google.visualization.PieChart($el);

        chart.draw(data, options);
      }

      function parsedEvents (events) {
        var parsed = [];

        parsed.push(["Eventos", "Número de ocorrências"]);

        angular.forEach(events, function (e) {
          parsed.push([e.name, e.total]);
        })

        return parsed;
      }
    }
  }
})();
