(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('UsersService', UsersService);

  UsersService.$inject = ['$http', '$location', 'DataService', 'UrlService', 'localStorageService'];

  function UsersService($http, $location, DataService, UrlService, localStorageService) {

    var service = {};

    service.initialize = function () {
      var userId = localStorageService.get("userId");
      DataService.setUserId(userId);
    };

    service.redirectIfNeeded = function () {
      if (DataService.getUserId() == null) {
        $location.path("/users");
        return true;
      } else {
        return false;
      }
    };

    service.selectUserId = function(userId) {
      localStorageService.set("userId", userId);
      DataService.setUserId(userId);
      $location.path("/");
    };

    service.loadUsers = function (callback) {
      $http.get(UrlService.users()).then(function (response) {
        DataService.setUsers(response.data);
        callback();
      });
    };

    service.getUsers = function () {
      return DataService.getAppData().users;
    };

    return service;

  };
})();