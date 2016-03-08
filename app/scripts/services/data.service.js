(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('DataService', DataService);

  DataService.$inject = ['$rootScope', 'base64'];

  function DataService($rootScope, base64) {

    var service = {};

    service.initialize = function () {
      $rootScope.appData = new AppData();
    };

    service.setFavorites = function (favoritesList) {
      var map = {};
      for (var i in favoritesList) {
        favoritesList[i].pathEncoded = base64.encode(favoritesList[i].path);
        map[favoritesList[i].path] = favoritesList[i].id;
      }
      this.getAppData().favoritesMap = map;
      this.getAppData().favorites = favoritesList;
    };

    service.setPathData = function (pathData) {
      this.getAppData().pathData = pathData;
    };

    service.getAppData = function () {
      return $rootScope.appData;
    };

    service.getPathEntry = function (filename) {
      return this.getAppData().pathData.entryMap[filename];
    };

    service.setUsers = function (users) {
      this.getAppData().users = users;
    };

    service.setUserId = function (userId) {
      this.getAppData().userId = userId;
    }

    service.getUserId = function () {
      return this.getAppData().userId;
    }

    return service;
  };
})();
