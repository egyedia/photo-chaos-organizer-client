(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('UsersController', UsersController);

  UsersController.$inject = ['$routeParams', 'UsersService', 'DataService'];

  function UsersController($routeParams, UsersService, DataService) {
    var vm = this;

    UsersService.initialize();

    if (!angular.isUndefined($routeParams.userId)) {
      UsersService.selectUserId($routeParams.userId);
    } else {
      UsersService.loadUsers(function () {
        vm.userList = UsersService.getUsers();
        vm.userId = DataService.getUserId();
      });
    }
  }
})();