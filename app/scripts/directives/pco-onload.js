/*global angularApp */
'use strict';

var pcoOnload = function () {

  function link(scope, element, attrs) {
    element.bind("load", function (e) {
      //console.log(e.target.naturalHeight);
      //console.log(e.target.naturalWidth);
    });
  }

  return {
    restrict: 'A',
    link    : link
  };

};

pcoOnload.$inject = [];
angularApp.directive('pcoOnload', pcoOnload);