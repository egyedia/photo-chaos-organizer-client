(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('TaskTemplateListController', TaskTemplateListController);

  TaskTemplateListController.$inject = ['UsersService', 'TaskTemplatesService'];

  function TaskTemplateListController(UsersService, TaskTemplatesService) {
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