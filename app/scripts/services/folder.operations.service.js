(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('FolderOperationsService', FolderOperationsService);

  FolderOperationsService.$inject = ['RestCallBuilder', 'UrlService'];

  function FolderOperationsService(RestCallBuilder, UrlService) {

    var service = {};

    service.renameFolder = function (oldFolderObject, newName) {
      var postData = {
        name: newName
      };
      return RestCallBuilder.put(UrlService.filesystemPathId(oldFolderObject.path), postData);
    };

    return service;

  };
})();