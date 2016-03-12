(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('UserListController', UserListController);

  UserListController.$inject = ['$location', '$route', 'UsersService', 'DataService'];

  function UserListController($location, $route, UsersService, DataService) {
    var vm = this;

    UsersService.initialize();

    UsersService.loadUsers().then(function () {
      vm.userList = UsersService.getUsers();
      vm.userId = DataService.getUserId();
      if (vm.userList.length == 0) {
        UsersService.createDefaultUser().then(function () {
          $location.path("/user-select");
          $route.reload();
        });
      }
    });

  }
})();