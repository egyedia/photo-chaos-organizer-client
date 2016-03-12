(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('TaskListController', TaskListController);

  TaskListController.$inject = ['$location', '$route', 'UsersService', 'DataService'];

  function TaskListController($location, $route, UsersService, DataService) {
    var vm = this;

    UsersService.initialize();
    if (UsersService.redirectIfNeeded()) {
      return;
    }

    var tl = [];
    var preview = {
      "id": "copyFilesPreview",
      "title": "Copy files to folders by date - PREVIEW"
    };
    tl.push(preview);
    var run = {
      "id": "copyFilesRun",
      "title": "Copy files to folders by date - RUN"
    };
    tl.push(run);

    vm.taskList = tl;


  }
})();