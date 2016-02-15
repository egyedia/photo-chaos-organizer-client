/*global angularApp */
'use strict';

var ngRepeatFinished = function ($document, $timeout) {

  function link(scope, element, attrs) {
    if (scope.$last === true) {
      $timeout(function () {
        scope[attrs.ngRepeatFinished]();
      });
    }
  }

  return {
    restrict: 'A',
    link    : link
  };

};

ngRepeatFinished.$inject = ['$document', '$timeout'];
angularApp.directive('ngRepeatFinished', ngRepeatFinished);