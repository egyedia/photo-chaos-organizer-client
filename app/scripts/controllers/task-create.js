(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('TaskCreateController', TaskCreateController);

  TaskCreateController.$inject = ['$routeParams', 'TaskService', 'UsersService', 'TaskTemplatesService', '$location',
                                  'DataService', 'CONST'];

  function TaskCreateController($routeParams, TaskService, UsersService, TaskTemplatesService, $location, DataService,
                                CONST) {
    var vm = this;

    UsersService.initialize();
    if (UsersService.redirectIfNeeded()) {
      return;
    }

    DataService.setAppMode(CONST.appMode.PAGE);

    this.createTask = function () {
      var postData = {};
      postData.parameters = this.taskTemplateData;
      postData.className = this.taskTemplate.className;
      postData.taskName = this.taskTemplate.taskName;
      TaskService.createTask(postData).then(function (response) {
        $location.path("/task-list");
      });
    };

    TaskTemplatesService.loadTaskTemplate($routeParams.className).then(function (response) {
      vm.taskTemplate = response.data;
      vm.taskTemplate.taskName = "New Task @" + new Date();
      vm.taskTemplateData = {};
      for (var pn in vm.taskTemplate.parameters) {
        vm.taskTemplateData[pn] = vm.taskTemplate.parameters[pn].defaultValue;
      }
    });

  }
})();