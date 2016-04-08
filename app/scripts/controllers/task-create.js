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

    DataService.setAppMode(CONST.appMode.NONE);

    this.createTask = function () {
      var postData = {};
      postData.parameters = this.taskTemplateData;
      postData.className = this.taskTemplate.className;
      TaskService.createTask(postData).then(function (response) {
        $location.path("/task-list");
      });
    };

    TaskTemplatesService.loadTaskTemplate($routeParams.className).then(function (response) {
      vm.taskTemplate = response.data;
      vm.taskTemplateData = {};
      for (var pn in vm.taskTemplate.parameters) {
        vm.taskTemplateData[pn] = vm.taskTemplate.parameters[pn].defaultValue;
      }
    });

  }
})();