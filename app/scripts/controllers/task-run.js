(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('TaskRunController', TaskRunController);

  TaskRunController.$inject = ['$routeParams', '$http', '$route', 'UsersService', 'UrlService'];

  function TaskRunController($routeParams, $http, $route, UsersService, UrlService) {
    var vm = this;

    UsersService.initialize();
    if (UsersService.redirectIfNeeded()) {
      return;
    }

    if ($routeParams.taskId == 'copyFilesPreview') {
      $http.get(UrlService.taskCopyToDatedFolder()).then(function (response) {
        vm.task = response.data;
      });
    } else if ($routeParams.taskId == 'copyFilesRun') {
      $http.get(UrlService.taskCopyToDatedFolder() + '?perform=true').then(function (response) {
        vm.task = response.data;
      });
    }


  }
})();