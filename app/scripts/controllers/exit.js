(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('ExitController', ExitController);

  ExitController.$inject = ['$window', '$translate', 'AppControlService', 'DataService', 'CONST'];

  function ExitController($window, $translate, AppControlService, DataService, CONST) {
    var vm = this;
    vm.closeMessage = "";
    DataService.setAppMode(CONST.appMode.PAGE);

    vm.exitApplication = function () {
      console.log("Exit requested");
      AppControlService.shutdownServer().then(function (response) {
        vm.closeMessage = $translate.instant('exit.closeMessage');
        $window.close();
      }).catch(function (response) {
        vm.closeMessage = $translate.instant('exit.closeErrorMessage');
      });
    }
  }
})();