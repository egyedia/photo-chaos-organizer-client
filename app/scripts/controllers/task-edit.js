(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('TaskEditController', TaskEditController);

  TaskEditController.$inject = ['$routeParams', 'TaskService', 'Application', 'TaskTemplatesService', '$location',
                                  'DataService', 'CONST'];

  function TaskEditController($routeParams, TaskService, Application, TaskTemplatesService, $location, DataService,
                                CONST) {
    var vm = this;

    vm.updateTask = function (id) {
      var postData = {};
      postData.parameters = this.taskTemplateData;
      postData.className = this.taskTemplate.className;
      postData.taskName = this.taskTemplate.taskName;
      TaskService.updateTask(id, postData).then(function (response) {
        $location.path("/task-launch/" + id);
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
          vm.taskTemplate.taskName = vm.task.name;
          vm.taskTemplateData = {};
          for (var pn in vm.taskTemplate.parameters) {
            vm.taskTemplateData[pn] = vm.task.parameters[pn];
          }
        });
      });
    });

  }
})();