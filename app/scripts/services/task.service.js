(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('TaskService', TaskService);

  TaskService.$inject = ['$q', '$http', 'RestCallBuilder', 'UrlService', 'DataService'];

  function TaskService($q, $http, RestCallBuilder, UrlService, DataService) {

    var service = {};

    service.initialize = function () {
    };

    service.createTask = function (taskData) {
      return RestCallBuilder.post(UrlService.tasks(), taskData);
    };

    service.loadTasks = function () {
      var defer = $q.defer();

      RestCallBuilder.get(UrlService.tasks()).then(function (response) {
        DataService.setTasks(response.data);
        defer.resolve(response);
      }).catch(function (response) {
        defer.reject(response);
      });

      return defer.promise;
    };

    service.getTasks = function () {
      return DataService.getAppData().tasks;
    };

    return service;

  };
})();