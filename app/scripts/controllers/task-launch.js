(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('TaskLaunchController', TaskLaunchController);

  TaskLaunchController.$inject = ['$routeParams', 'Application', 'TaskService', 'TaskTemplatesService', 'DataService',
                                  'CONST'];

  function TaskLaunchController($routeParams, Application, TaskService, TaskTemplatesService, DataService, CONST) {
    var vm = this;


    Application.launch(function () {
      DataService.setAppMode(CONST.appMode.PAGE);
      TaskService.loadTask($routeParams.taskId).then(function (response) {
        var task = response.data;
        vm.task = task;
        var cn = task.className;
        TaskTemplatesService.loadTaskTemplate(cn).then(function (response) {
          vm.taskTemplate = response.data;
          // TODO: refactor this, have it in a service
          vm.pco = DataService.getAppData();
          for (var pn in vm.taskTemplate.parameters) {
            var p = vm.taskTemplate.parameters[pn];
            if (p.type == 'shortDateFormat') {
              vm.task.parameters[p.name] = vm.pco.frontendSettings.dateFormats.options[vm.task.parameters[p.name]];
            }
          }
        });
      });
    });
  }
})();