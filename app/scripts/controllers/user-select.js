(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('UserSelectController', UserSelectController);

  UserSelectController.$inject = ['$routeParams', '$location', '$route', 'UsersService', 'DataService'];

  function UserSelectController($routeParams, $location, $route, UsersService, DataService) {
    var vm = this;

    UsersService.initialize();

    UsersService.selectUserId($routeParams.userId);
  }
})();