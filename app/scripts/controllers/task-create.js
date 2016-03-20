(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('TaskCreateController', TaskCreateController);

  TaskCreateController.$inject = ['$routeParams', '$http', '$route', 'UsersService', 'TaskTemplatesService'];

  function TaskCreateController($routeParams, $http, $route, UsersService, TaskTemplatesService) {
    var vm = this;

    UsersService.initialize();
    if (UsersService.redirectIfNeeded()) {
      return;
    }

    TaskTemplatesService.loadTaskTemplate($routeParams.taskTemplateFilePath).then(function (response) {
      vm.taskTemplate = response.data;
      vm.taskTemplateData = {};
      for(var pn in vm.taskTemplate.parameters) {
        vm.taskTemplateData[pn] = vm.taskTemplate.parameters[pn].defaultValue;
      }
    });

  }
})();