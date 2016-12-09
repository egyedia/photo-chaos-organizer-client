(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('TaskCloneController', TaskCloneController);

  TaskCloneController.$inject = ['$routeParams', '$location', 'Application', 'TaskService', 'NotificationService',
                                  'DataService', 'CONST'];

  function TaskCloneController($routeParams, $location, Application, TaskService, NotificationService, DataService,
                                CONST) {
    var vm = this;

    Application.launch(function () {
      DataService.setAppMode(CONST.appMode.PAGE);
      TaskService.cloneTask($routeParams.taskId).then(function (response) {
        NotificationService.showSuccess('taskCloned', {"taskId": $routeParams.taskId});
        $location.path('/task-list');
      }).catch(function (error) {
        if (error.status == 404) {
          NotificationService.showError('taskToCloneNotFound', {"taskId": $routeParams.taskId});
          $location.path('/task-list');
        }
      });
    });

  }
})();