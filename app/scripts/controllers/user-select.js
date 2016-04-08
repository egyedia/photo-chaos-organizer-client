(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('UserSelectController', UserSelectController);

  UserSelectController.$inject = ['$routeParams', 'UsersService', 'DataService', 'CONST'];

  function UserSelectController($routeParams, UsersService, DataService, CONST) {
    var vm = this;

    DataService.setAppMode(CONST.appMode.NONE);

    UsersService.initialize();

    UsersService.selectUserId($routeParams.userId);
  }
})();