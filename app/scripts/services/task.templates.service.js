(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('TaskTemplatesService', TaskTemplatesService);

  TaskTemplatesService.$inject = ['$q', '$http', '$location', '$route', 'DataService', 'UrlService', 'localStorageService'];

  function TaskTemplatesService($q, $http, $location, $route, DataService, UrlService, localStorageService) {

    var service = {};

    service.initialize = function () {
    };

    service.loadTaskTemplates = function () {
      var defer = $q.defer();

      $http.get(UrlService.taskTemplates()).then(function (response) {
        DataService.setTaskTemplates(response.data);
        defer.resolve(response);
      }).catch(function (response) {
        defer.reject(response);
      });

      return defer.promise;
    };

    service.getTaskTemplates = function () {
      return DataService.getAppData().taskTemplates;
    };

    service.loadTaskTemplate = function (className) {
      return $http.get(UrlService.taskTemplateClassName(className));
    };

    return service;

  };
})();