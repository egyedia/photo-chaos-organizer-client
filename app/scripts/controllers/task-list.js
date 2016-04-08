(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('TaskListController', TaskListController);

  TaskListController.$inject = ['UsersService', 'TaskService', 'DataService', 'CONST'];

  function TaskListController(UsersService, TaskService, DataService, CONST) {
    var vm = this;

    UsersService.initialize();
    if (UsersService.redirectIfNeeded()) {
      return;
    }

    DataService.setAppMode(CONST.appMode.NONE);

    TaskService.loadTasks().then(function () {
      vm.taskList = TaskService.getTasks();
    });
  }
})();