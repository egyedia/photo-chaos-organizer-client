(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('TaskTemplateListController', TaskTemplateListController);

  TaskTemplateListController.$inject = ['UsersService', 'TaskTemplatesService', 'DataService', 'CONST'];

  function TaskTemplateListController(UsersService, TaskTemplatesService, DataService, CONST) {
    var vm = this;

    UsersService.initialize();
    if (UsersService.redirectIfNeeded()) {
      return;
    }

    DataService.setAppMode(CONST.appMode.NONE);

    TaskTemplatesService.loadTaskTemplates().then(function () {
      vm.taskTemplateList = TaskTemplatesService.getTaskTemplates();
    });
  }
})();