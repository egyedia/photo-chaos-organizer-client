(function () {
  'use strict';

  angular
      .module('pcoApp')
      .run(run);

  run.$inject = ['DataService'];

  function run(DataService) {
    DataService.initialize();
  }
})();