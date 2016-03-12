(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('RootsService', RootsService);

  RootsService.$inject = ['$q', '$http', 'base64', 'UrlService'];

  function RootsService($q, $http, base64, UrlService) {

    var roots = [];

    var service = {};

    service.loadRoots = function () {
      var defer = $q.defer();

      $http.get(UrlService.filesystemRoots()).then(function (response) {
        var rootList = response.data;
        for (var i in rootList) {
          rootList[i].pathEncoded = base64.encode(rootList[i].path);
        }
        roots = rootList;
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