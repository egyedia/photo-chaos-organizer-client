(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('TaskRunController', TaskRunController);

  TaskRunController.$inject = ['$routeParams', '$timeout', 'Application', 'TaskService', 'TaskTemplatesService',
                               'DataService', '$translate', 'CONST'];

  function TaskRunController($routeParams, $timeout, Application, TaskService, TaskTemplatesService, DataService,
                             $translate, CONST) {
    var vm = this;

    vm.loadTaskStatus = function () {
      TaskService.loadTaskStatus($routeParams.taskId).then(function (response) {
        vm.reports = response.data.reports;

        for (var i in vm.reports) {
          var report = vm.reports[i];
          var headers = report.headers;
          for (var h in headers) {
            var hn = headers[h];
            headers[h] = {
              field      : hn,
              displayName: $translate.instant('report.header.' + hn)
            };
          }
        }
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
          // TODO: refactor this, have it in a service
          vm.pco = DataService.getAppData();
          for (var pn in vm.taskTemplate.parameters) {
            var p = vm.taskTemplate.parameters[pn];
            if (p.type == 'shortDateFormat') {
              vm.task.parameters[p.name] = vm.pco.frontendSettings.dateFormats.options[vm.task.parameters[p.name]];
            }
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