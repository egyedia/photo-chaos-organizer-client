'use strict';

var FavoritesService = function ($http, base64, $rootScope) {

  $rootScope.favorites = null;
  $rootScope.favoritesMap = null;

  var service = {};

  service.loadFavorites = function (callback) {
    $http.get('http://localhost:8080/filesystem-favorites').then(function (response) {
      $rootScope.favoritesMap = {};
      var favoriteList = response.data;
      for (var i in favoriteList) {
        favoriteList[i].pathEncoded = base64.encode(favoriteList[i].path);
        $rootScope.favoritesMap[favoriteList[i].path] = favoriteList[i].id;
      }
      $rootScope.favorites = favoriteList;
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
    return $rootScope.favorites;
  };

  service.getIdForPath = function (path) {
    return $rootScope.favoritesMap[path];
  };

  service.isFavorite = function (path) {
    return $rootScope.favoritesMap.hasOwnProperty(path);
  };

  service.isInitialized = function () {
    return $rootScope.favoritesMap !== null;
  };

  return service;

};

FavoritesService.$inject = ['$http', 'base64', '$rootScope'];
angularApp.service('FavoritesService', FavoritesService);