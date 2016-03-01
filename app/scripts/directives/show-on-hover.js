(function () {
  'use strict';

  angular
      .module('pcoApp')
      .directive('showOnHover', showOnHover);

  showOnHover.$inject = [];

  function showOnHover() {
    var directive = {
      restrict: 'A',
      link    : link
    };
    return directive;

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
  }
})();