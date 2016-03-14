(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('RootsService', RootsService);

  RootsService.$inject = ['$q', '$http', 'UrlService'];

  function RootsService($q, $http, UrlService) {

    var roots = [];

    var service = {};

    service.loadRoots = function () {
      var defer = $q.defer();

      $http.get(UrlService.filesystemRoots()).then(function (response) {
        roots = response.data;
        defer.resolve(response);
      }).catch(function (response) {
        defer.reject(response);
      });

      return defer.promise;
    };

    service.getRoots = function () {
      return roots;
    }

    return service;

  };
})();