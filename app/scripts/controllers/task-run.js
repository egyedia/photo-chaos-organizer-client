(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('TaskRunController', TaskRunController);

  TaskRunController.$inject = ['$routeParams', '$http', '$route', 'UsersService', 'UrlService'];

  function TaskRunController($routeParams, $http, $route, UsersService, UrlService) {
    var vm = this;

    UsersService.initialize();
    if (UsersService.redirectIfNeeded()) {
      return;
    }

  }
})();