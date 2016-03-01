(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('FavoritesService', FavoritesService);

  FavoritesService.$inject = ['$http', 'DataService'];

  function FavoritesService($http, DataService) {

    var service = {};

    service.loadFavorites = function (callback) {
      $http.get('http://localhost:8080/filesystem-favorites').then(function (response) {
        DataService.setFavorites(response.data);
        callback();
      });
    };

    service.createFavorite = function (path, callback) {
      var postData = {
        'path': path
      };
      $http.post('http://localhost:8080/filesystem-favorites', postData).then(function (response) {
        callback();
      });
    };

    service.removeFavoriteByPath = function (path, callback) {
      var id = this.getIdForPath(path);
      $http.delete('http://localhost:8080/filesystem-favorites' + '/' + id).then(function (response) {
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