(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('RootsService', RootsService);

  RootsService.$inject = ['$http', 'base64', 'UrlService'];

  function RootsService($http, base64, UrlService) {

    var roots = [];

    var service = {};

    service.loadRoots = function (callback) {
      $http.get(UrlService.filesystemRoots()).then(function (response) {
        var rootList = response.data;
        for (var i in rootList) {
          rootList[i].pathEncoded = base64.encode(rootList[i].path);
        }
        roots = rootList;
        callback();
      });
    };

    service.getRoots = function () {
      return roots;
    }

    return service;

  };
})();