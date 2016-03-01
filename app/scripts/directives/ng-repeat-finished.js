(function () {
  'use strict';

  angular
      .module('pcoApp')
      .directive('ngRepeatFinished', ngRepeatFinished);

  ngRepeatFinished.$inject = ['$timeout'];

  function ngRepeatFinished($timeout) {
    var directive = {
      restrict: 'A',
      link    : link
    };
    return directive;

    function link(scope, element, attrs) {
      if (scope.$last === true) {
        $timeout(function () {
          scope.vm[attrs.ngRepeatFinished]();
        });
      }
    }
  }
})();