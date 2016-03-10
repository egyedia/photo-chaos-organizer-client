(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('UsersController', UsersController);

  UsersController.$inject = ['$routeParams', '$location', '$route', 'UsersService', 'DataService'];

  function UsersController($routeParams, $location, $route, UsersService, DataService) {
    var vm = this;

    UsersService.initialize();

    if (!angular.isUndefined($routeParams.userId)) {
      UsersService.selectUserId($routeParams.userId);
    } else {
      UsersService.loadUsers(function () {
        vm.userList = UsersService.getUsers();
        vm.userId = DataService.getUserId();
        if (vm.userList.length == 0) {
          UsersService.createDefaultUser(function () {
            $location.path("/selectUser");
            $route.reload();
          });
        }
      });
    }
  }
})();