(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('TaskListController', TaskListController);

  TaskListController.$inject = ['UsersService', 'TaskService'];

  function TaskListController(UsersService, TaskService) {
    var vm = this;

    UsersService.initialize();
    if (UsersService.redirectIfNeeded()) {
      return;
    }

    TaskService.loadTasks().then(function () {
      vm.taskList = TaskService.getTasks();
    });
  }
})();