(function () {
  'use strict';

  angular
      .module('pcoApp')
      .config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
    $routeProvider
        .when('/', {
          templateUrl: 'views/dashboard.html',
          controller : 'DashboardController',
          controllerAs: 'vm'
        })
        .when('/users', {
          templateUrl: 'views/users.html',
          controller : 'UsersController',
          controllerAs: 'vm'
        })
        .when('/users/:userId*', {
          templateUrl: 'views/users.html',
          controller : 'UsersController',
          controllerAs: 'vm'
        })
        .when('/path/:path', {
          templateUrl: 'views/path.html',
          controller : 'PathController',
          controllerAs: 'vm'
        })
        .otherwise({
          redirectTo: '/'
        });
  }
})();