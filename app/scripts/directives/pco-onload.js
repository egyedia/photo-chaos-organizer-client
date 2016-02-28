/*global angularApp */
'use strict';

var pcoOnload = function (DataService) {

  function link(scope, element, attrs) {
    element.bind("load", function (e) {
      scope.$apply(function() {
        DataService.getPathEntry(attrs['ngDataFilename']).hideIcon = true;
      });
    });
    /*element.bind('error', function () {
    });*/
  }

  return {
    restrict: 'A',
    link    : link
  };

};

pcoOnload.$inject = ['DataService'];
angularApp.directive('pcoOnload', pcoOnload);