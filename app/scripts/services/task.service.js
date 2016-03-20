(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('TaskService', TaskService);

  TaskService.$inject = ['$q', '$http', 'RestCallBuilder', 'UrlService'];

  function TaskService($q, $http, RestCallBuilder, UrlService) {

    var service = {};

    service.initialize = function () {
    };

    service.createTask = function (taskData) {
      return RestCallBuilder.post(UrlService.tasks(), taskData);
    };

    return service;

  };
})();