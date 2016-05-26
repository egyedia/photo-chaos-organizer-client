(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('TaskDeleteController', TaskDeleteController);

  TaskDeleteController.$inject = ['$routeParams', '$location', 'Application', 'TaskService', 'NotificationService',
                                  'DataService', 'CONST'];

  function TaskDeleteController($routeParams, $location, Application, TaskService, NotificationService, DataService,
                                CONST) {
    var vm = this;

    Application.launch(function () {
      DataService.setAppMode(CONST.appMode.PAGE);
      TaskService.deleteTask($routeParams.taskId).then(function (response) {
        NotificationService.showSuccess('taskDeleted', {"taskId": $routeParams.taskId});
        $location.path('/task-list');
      }).catch(function (error) {
        if (error.status == 404) {
          NotificationService.showError('taskToDeleteNotFound', {"taskId": $routeParams.taskId});
          $location.path('/task-list');
        }
      });
    });

  }
})();