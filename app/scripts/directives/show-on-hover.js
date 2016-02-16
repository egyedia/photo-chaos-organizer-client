/*global angularApp */
'use strict';

var showOnHover = function () {

  function link(scope, element, attrs) {
    var selector = attrs.showOnHover;
    var selectedElement = element.closest(selector);
    selectedElement.bind('mouseenter', function () {
      element.show();
    });
    selectedElement.bind('mouseleave', function () {
      element.hide();
    });
  }

  return {
    restrict: 'A',
    link    : link
  };

};

showOnHover.$inject = [];
angularApp.directive('showOnHover', showOnHover);