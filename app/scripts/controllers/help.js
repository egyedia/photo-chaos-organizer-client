(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('HelpController', HelpController);

  HelpController.$inject = ['DataService', 'CONST'];

  function HelpController(DataService, CONST) {
    var vm = this;

    DataService.setAppMode(CONST.appMode.PAGE);
  }
})();