(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('UsersService', UsersService);

  UsersService.$inject = ['$q', '$http', '$location', '$route', 'DataService', 'UrlService', 'localStorageService'];

  function UsersService($q, $http, $location, $route, DataService, UrlService, localStorageService) {

    var service = {};

    service.initialize = function () {
      var userId = localStorageService.get("userId");
      DataService.setUserId(userId);
    };

    service.redirectIfNeeded = function () {
      var currentUserId = DataService.getUserId();
      if (currentUserId == null) {
        $location.path("/user-list");
        return true;
      } else {
        this.loadUser(currentUserId).catch(function (response) {
          service.nonexistingUserIdFound();
        });
        return false;
      }
    };

    service.selectUserId = function (userId) {
      localStorageService.set("userId", userId);
      DataService.setUserId(userId);
      $location.path("/");
      $route.reload();
    };

    service.loadUsers = function () {
      var defer = $q.defer();

      $http.get(UrlService.users()).then(function (response) {
        DataService.setUsers(response.data);
        defer.resolve(response);
      }).catch(function (response) {
        defer.reject(response);
      });

      return defer.promise;
    };

    service.loadUser = function (userId) {
      return $http.get(UrlService.usersId(userId));
    };

    service.getUsers = function () {
      return DataService.getAppData().users;
    };

    service.createDefaultUser = function () {
      var postData = {
        "displayName": "Default User"
      };
      return $http.post(UrlService.users(), postData);
    };

    service.nonexistingUserIdFound = function () {
      localStorageService.set("userId", null);
      $location.path("/");
      $route.reload();
    };

    return service;

  };
})();