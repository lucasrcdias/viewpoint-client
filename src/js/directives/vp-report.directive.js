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

      google.charts.load('current', { 'packages': ['corechart'] });
      google.charts.setOnLoadCallback(drawChart);

      window.addEventListener("resize", drawChart);

      scope.$watch("data", function () {
        drawChart();
      });

      function drawChart () {
        if (!scope.data || !scope.data.length) { return; }

        var events  = parsedEvents(scope.data);
        var data    = google.visualization.arrayToDataTable(events);
        var options = {
          "title": "Eventos do grupo " + scope.group,
          "width": element[0].parentElement.offsetWidth
        }

        var chart = new google.visualization.PieChart(element[0]);

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
