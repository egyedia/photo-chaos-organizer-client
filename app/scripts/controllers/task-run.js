(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('TaskRunController', TaskRunController);

  TaskRunController.$inject = ['$routeParams', '$timeout', 'Application', 'TaskService', 'TaskTemplatesService',
                               'DataService', 'CONST'];

  function TaskRunController($routeParams, $timeout, Application, TaskService, TaskTemplatesService, DataService,
                             CONST) {
    var vm = this;

    vm.loadTaskStatus = function () {
      TaskService.loadTaskStatus($routeParams.taskId).then(function (response) {
        vm.reports = response.data.reports;
        vm.info = response.data.info;
        if (response.data.info.running == true) {
          $timeout(vm.loadTaskStatus, 1000);
        }
      });
    };

    Application.launch(function () {
      DataService.setAppMode(CONST.appMode.PAGE);

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
          TaskService.runTask($routeParams.taskId).then(function (response) {
            vm.taskStatus = response.data;
            vm.loadTaskStatus();
          });
        });
      });
    });

  }
})();