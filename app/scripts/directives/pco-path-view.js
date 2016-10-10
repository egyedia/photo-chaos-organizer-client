(function () {
  'use strict';

  angular
      .module('pcoApp')
      .directive('pcoPathView', pcoPathView);

  pcoPathView.$inject = [];

  function pcoPathView() {
    var directive = {
      restrict: 'A',
      link    : link,
      scope   : {
        path: '@'
      }
    };
    return directive;

    function link(scope, element, attrs) {
      scope.watch('path', function () {
        element.html("pcoPathView:" + attrs.path);
      });
    }
  }
})();