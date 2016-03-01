(function () {
  'use strict';

  angular
      .module('pcoApp')
      .directive('pcoOnload', pcoOnload);

  pcoOnload.$inject = ['DataService'];

  function pcoOnload(DataService) {
    var directive = {
      restrict: 'A',
      link    : link
    };
    return directive;

    function link(scope, element, attrs) {
      element.bind("load", function (e) {
        scope.$apply(function() {
          DataService.getPathEntry(attrs['ngDataFilename']).hideIcon = true;
        });
      });
      /*element.bind('error', function () {
       });*/
    }
  }
})();