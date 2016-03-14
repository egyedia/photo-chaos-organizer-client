(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('FavoritesService', FavoritesService);

  FavoritesService.$inject = ['$q', 'DataService', 'UrlService', 'RestCallBuilder'];

  function FavoritesService($q, DataService, UrlService, RestCallBuilder) {

    var service = {};

    service.loadFavorites = function () {
      var defer = $q.defer();
      RestCallBuilder.get(UrlService.filesystemFavorites()).then(function (response) {
        DataService.setFavorites(response.data);
        defer.resolve(response);
      }).catch(function (response) {
        defer.reject(response);
      });

      return defer.promise;
    };

    service.createFavorite = function (path) {
      var postData = {
        'path': path
      };
      return RestCallBuilder.post(UrlService.filesystemFavorites(), postData);
    };

    service.removeFavoriteByPath = function (path) {
      var id = this.getIdForPath(path);
      return RestCallBuilder.delete(UrlService.filesystemFavoritesId(id));
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