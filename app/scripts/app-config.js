(function () {
  'use strict';

  angular
      .module('pcoApp')
      .config(config);

  config.$inject = ['$routeProvider', '$locationProvider'];

  function config($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
          templateUrl: 'views/dashboard.html',
          controller : 'DashboardController',
          controllerAs: 'vm'
        })
        .when('/user-list', {
          templateUrl: 'views/user-list.html',
          controller : 'UserListController',
          controllerAs: 'vm'
        })
        .when('/user-select/:userId', {
          templateUrl: 'views/empty.html',
          controller : 'UserSelectController',
          controllerAs: 'vm'
        })
        .when('/path/:path', {
          templateUrl: 'views/path.html',
          controller : 'PathController',
          controllerAs: 'vm'
        })
        .when('/task-list', {
          templateUrl: 'views/task-list.html',
          controller : 'TaskListController',
          controllerAs: 'vm'
        })
        .when('/task-run/:taskId', {
          templateUrl: 'views/task-run.html',
          controller : 'TaskRunController',
          controllerAs: 'vm'
        })
        .otherwise({
          redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
  }
})();