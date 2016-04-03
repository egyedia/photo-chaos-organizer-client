(function () {
  'use strict';

  angular
      .module('pcoApp')
      .run(run);

  run.$inject = ['DataService', 'KeyService', '$document', '$window'];

  function run(DataService, KeyService, $document, $window) {
    DataService.initialize();

    var bindTo = $document;
    //var bindTo = angular.element($window);

    bindTo.bind('keydown', function (e) {
      var te = {};
      /*if (e.hasOwnProperty('key') && typeof e.key != 'undefined') {
       te.key = e.key;
       } else if (e.hasOwnProperty('originalEvent') && typeof e.originalEvent != 'undefined') {
       if (typeof e.originalEvent.code == 'string') {
       te.key = e.originalEvent.code;
       } else if (typeof e.originalEvent.keyIdentifier == 'string') {
       te.key = e.originalEvent.keyIdentifier;
       if (te.key == 'Right') {
       te.key = 'ArrowRight';
       } else if (te.key == 'Left') {
       te.key = 'ArrowLeft';
       }
       }
       }*/
      te.which = e.which;

      te.metaKey = e.metaKey;
      te.shiftKey = e.shiftKey;
      te.ctrlKey = e.ctrlKey;
      te.altKey = e.altKey;

      //console.log(e);
      //console.log(te);
      KeyService.event(te);
    });

  }
})();