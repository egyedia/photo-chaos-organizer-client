(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('FolderOperationsService', FolderOperationsService);

  FolderOperationsService.$inject = ['$q', '$http', 'UrlService'];

  function FolderOperationsService($q, $http, UrlService) {

    var service = {};

    service.renameFolder = function (oldFolderObject, newName) {
      console.log("Rename folder:");
      console.log(oldFolderObject);
      console.log(newName);
      //return $http.get(UrlService.shutdownServer());
    };

    return service;

  };
})();