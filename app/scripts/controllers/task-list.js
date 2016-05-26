(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('TaskListController', TaskListController);

  TaskListController.$inject = ['Application', 'TaskService', 'DataService', 'CONST'];

  function TaskListController(Application, TaskService, DataService, CONST) {
    var vm = this;

    vm.listRenderedDone = function () {
      vm.listRendered = true;
    };

    Application.launch(function () {
      vm.listRendered = false;
      DataService.setAppMode(CONST.appMode.PAGE);
      TaskService.loadTasks().then(function () {
        vm.taskList = TaskService.getTasks();
        if (vm.taskList.length == 0) {
          vm.listRenderedDone();
        }
      });
    });
  }
})();