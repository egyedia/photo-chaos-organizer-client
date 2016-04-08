(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('AppControlService', AppControlService);

  AppControlService.$inject = ['$q', '$http', 'UrlService'];

  function AppControlService($q, $http, UrlService) {

    var service = {};

    service.shutdownServer = function () {
      return $http.get(UrlService.shutdownServer());
    };

    return service;

  };
})();