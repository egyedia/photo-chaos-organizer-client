(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('TaskPreviewController', TaskPreviewController);

  TaskPreviewController.$inject = ['$routeParams', 'UsersService', 'TaskService', 'TaskTemplatesService', 'DataService',
                                   'CONST'];

  function TaskPreviewController($routeParams, UsersService, TaskService, TaskTemplatesService, DataService, CONST) {
    var vm = this;

    UsersService.initialize();
    if (UsersService.redirectIfNeeded()) {
      return;
    }

    DataService.setAppMode(CONST.appMode.NONE);

    TaskService.loadTask($routeParams.taskId).then(function (response) {
      var task = response.data;
      vm.task = task;
      var cn = task.className;
      TaskTemplatesService.loadTaskTemplate(cn).then(function (response) {
        vm.taskTemplate = response.data;
        vm.taskTemplateData = {};
        for (var pn in vm.taskTemplate.parameters) {
          vm.taskTemplateData[pn] = vm.taskTemplate.parameters[pn].defaultValue;
        }
        TaskService.previewTask($routeParams.taskId).then(function (response) {
          vm.reports = response.data;
        });
      });
    });
  }
})();