(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('TaskCreateController', TaskCreateController);

  TaskCreateController.$inject = ['$routeParams', 'TaskService', 'UsersService', 'TaskTemplatesService'];

  function TaskCreateController($routeParams, TaskService, UsersService, TaskTemplatesService) {
    var vm = this;

    UsersService.initialize();
    if (UsersService.redirectIfNeeded()) {
      return;
    }

    this.createTask = function () {
      var postData = {};
      postData.parameters = this.taskTemplateData;
      postData.className = this.taskTemplate.className;
      TaskService.createTask(postData).then(function (response) {
        console.log(response.data);
      });
    }

    TaskTemplatesService.loadTaskTemplate($routeParams.className).then(function (response) {
      vm.taskTemplate = response.data;
      vm.taskTemplateData = {};
      for (var pn in vm.taskTemplate.parameters) {
        vm.taskTemplateData[pn] = vm.taskTemplate.parameters[pn].defaultValue;
      }
    });

  }
})();