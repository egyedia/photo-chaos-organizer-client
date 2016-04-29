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

    service.loadTask = function (taskId) {
      var defer = $q.defer();

      RestCallBuilder.get(UrlService.taskId(taskId)).then(function (response) {
        DataService.setTask(response.data);
        defer.resolve(response);
      }).catch(function (response) {
        defer.reject(response);
      });

      return defer.promise;
    };

    service.previewTask = function(taskId) {
      return RestCallBuilder.get(UrlService.previewTask(taskId));
    };

    service.loadTaskStatus = function(taskId) {
      return RestCallBuilder.get(UrlService.loadTaskStatus(taskId));
    };

    service.runTask = function(taskId) {
      return RestCallBuilder.get(UrlService.runTask(taskId));
    };

    return service;

  };
})();