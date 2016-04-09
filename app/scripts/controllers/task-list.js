(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('TaskListController', TaskListController);

  TaskListController.$inject = ['UsersService', 'TaskService', 'DataService', 'CONST'];

  function TaskListController(UsersService, TaskService, DataService, CONST) {
    var vm = this;

    vm.listRendered = false;

    UsersService.initialize();
    if (UsersService.redirectIfNeeded()) {
      return;
    }

    vm.listRenderedDone = function () {
      vm.listRendered = true;
    };

    DataService.setAppMode(CONST.appMode.PAGE);

    TaskService.loadTasks().then(function () {
      vm.taskList = TaskService.getTasks();
    });
  }
})();