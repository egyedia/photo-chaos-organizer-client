(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('TaskTemplateListController', TaskTemplateListController);

  TaskTemplateListController.$inject = ['$location', '$route', 'UsersService', 'TaskTemplatesService', 'DataService'];

  function TaskTemplateListController($location, $route, UsersService, TaskTemplatesService, DataService) {
    var vm = this;

    UsersService.initialize();
    if (UsersService.redirectIfNeeded()) {
      return;
    }

    TaskTemplatesService.loadTaskTemplates().then(function () {
      vm.taskTemplateList = TaskTemplatesService.getTaskTemplates();
    });
  }
})();