(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('FavoritesService', FavoritesService);

  FavoritesService.$inject = ['$http', 'DataService', 'UrlService'];

  function FavoritesService($http, DataService, UrlService) {

    var service = {};

    service.loadFavorites = function (callback) {
      $http.get(UrlService.filesystemFavorites()).then(function (response) {
        DataService.setFavorites(response.data);
        callback();
      });
    };

    service.createFavorite = function (path, callback) {
      var postData = {
        'path': path,
        'userId': DataService.getUserId()
      };
      $http.post(UrlService.filesystemFavorites(), postData).then(function (response) {
        callback();
      });
    };

    service.removeFavoriteByPath = function (path, callback) {
      var id = this.getIdForPath(path);
      $http.delete(UrlService.filesystemFavoritesId(id)).then(function (response) {
        callback();
      });
    };

    service.getFavorites = function () {
      return DataService.getAppData().favorites;
    };

    service.getIdForPath = function (path) {
      return DataService.getAppData().favoritesMap[path];
    };

    service.isFavorite = function (path) {
      return DataService.getAppData().favoritesMap.hasOwnProperty(path);
    };

    service.isInitialized = function () {
      return DataService.getAppData().favoritesMap !== null;
    };

    return service;

  };
})();