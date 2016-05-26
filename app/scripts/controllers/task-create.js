(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('TaskCreateController', TaskCreateController);

  TaskCreateController.$inject = ['$routeParams', 'TaskService', 'Application', 'TaskTemplatesService', '$location',
                                  'DataService', 'CONST'];

  function TaskCreateController($routeParams, TaskService, Application, TaskTemplatesService, $location, DataService,
                                CONST) {
    var vm = this;

    vm.createTask = function () {
      var postData = {};
      postData.parameters = this.taskTemplateData;
      postData.className = this.taskTemplate.className;
      postData.taskName = this.taskTemplate.taskName;
      TaskService.createTask(postData).then(function (response) {
        $location.path("/task-list");
      });
    };

    Application.launch(function () {
      DataService.setAppMode(CONST.appMode.PAGE);
      TaskTemplatesService.loadTaskTemplate($routeParams.className).then(function (response) {
        vm.taskTemplate = response.data;
        vm.taskTemplate.taskName = "New Task @" + new Date();
        vm.taskTemplateData = {};
        for (var pn in vm.taskTemplate.parameters) {
          vm.taskTemplateData[pn] = vm.taskTemplate.parameters[pn].defaultValue;
        }
      });
    });

  }
})();