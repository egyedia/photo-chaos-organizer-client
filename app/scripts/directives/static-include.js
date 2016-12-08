(function () {
  'use strict';

  angular
      .module('pcoApp')
      .directive('staticInclude', staticInclude);

  staticInclude.$inject = ['$http', '$templateCache', '$compile'];

  function staticInclude($http, $templateCache, $compile) {
    var directive = {
      restrict: 'A',
      link    : link
    };
    return directive;

    function link(scope, element, attrs) {
      var templatePath = attrs.staticInclude;
      $http.get(templatePath, { cache: $templateCache }).success(function(response) {
        var contents = element.html(response).contents();
        $compile(contents)(scope);
      });
    }
  }
})();