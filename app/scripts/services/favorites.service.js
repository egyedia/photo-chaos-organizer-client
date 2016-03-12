(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('FavoritesService', FavoritesService);

  FavoritesService.$inject = ['$q', '$http', 'DataService', 'UrlService'];

  function FavoritesService($q, $http, DataService, UrlService) {

    var service = {};

    service.loadFavorites = function () {
      var defer = $q.defer();

      $http.get(UrlService.filesystemFavorites()).then(function (response) {
        DataService.setFavorites(response.data);
        defer.resolve(response);
      }).catch(function (response) {
        defer.reject(response);
      });

      return defer.promise;
    };

    service.createFavorite = function (path) {
      var postData = {
        'path'  : path,
        'userId': DataService.getUserId()
      };
      return $http.post(UrlService.filesystemFavorites(), postData);
    };

    service.removeFavoriteByPath = function (path) {
      var id = this.getIdForPath(path);
      return $http.delete(UrlService.filesystemFavoritesId(id));
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