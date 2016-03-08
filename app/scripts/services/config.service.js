(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('ConfigService', ConfigService);

  ConfigService.$inject = [];

  function ConfigService() {

    var service = {};

    service.getThumbShowTimeout = function () {
      return 10;
    };

    service.getThumbShowBatchSize = function () {
      return 10;
    };

    return service;
  };
})();
