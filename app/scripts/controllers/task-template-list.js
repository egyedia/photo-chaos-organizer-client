(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('TaskTemplateListController', TaskTemplateListController);

  TaskTemplateListController.$inject = ['Application', 'TaskTemplatesService', 'DataService', 'CONST'];

  function TaskTemplateListController(Application, TaskTemplatesService, DataService, CONST) {
    var vm = this;

    Application.launch(function () {
      vm.listRendered = false;
      DataService.setAppMode(CONST.appMode.PAGE);
      TaskTemplatesService.loadTaskTemplates().then(function () {
        vm.taskTemplateList = TaskTemplatesService.getTaskTemplates();
      });
    });

  }
})();