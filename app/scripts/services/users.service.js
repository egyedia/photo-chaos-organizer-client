(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('UsersService', UsersService);

  UsersService.$inject = ['$http', '$location', '$route', 'DataService', 'UrlService', 'localStorageService'];

  function UsersService($http, $location, $route, DataService, UrlService, localStorageService) {

    var service = {};

    service.initialize = function () {
      var userId = localStorageService.get("userId");
      DataService.setUserId(userId);
    };

    service.redirectIfNeeded = function () {
      var currentUserId = DataService.getUserId();
      if (currentUserId == null) {
        $location.path("/selectUser");
        return true;
      } else {
        this.loadUser(currentUserId, function (response) {
          //console.log("OK");
          //console.log(response);
        }, function (response) {
          //console.log("NOK");
          //console.log(response);
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

    service.loadUsers = function (callback) {
      $http.get(UrlService.users()).then(function (response) {
        DataService.setUsers(response.data);
        callback();
      });
    };

    service.loadUser = function (userId, successCallback, errorCallback) {
      $http.get(UrlService.usersId(userId)).then(function (response) {
        successCallback(response);
      }).catch(function (response) {
        errorCallback(response);
      });
    };

    service.getUsers = function () {
      return DataService.getAppData().users;
    };

    service.createDefaultUser = function (callback) {
      var postData = {
        "displayName": "Default User"
      };
      $http.post(UrlService.users(), postData).then(function (response) {
        callback();
      });
    };

    service.nonexistingUserIdFound = function() {
      localStorageService.set("userId", null);
      $location.path("/");
      $route.reload();
    };

    return service;

  };
})();