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

    service.launchExternalVideo = function (path) {
      return $http.get(UrlService.externalVideo(path));
    };


    return service;

  };
})();