(function () {
  'use strict';

  angular
      .module('pcoApp')
      .config(config);

  config.$inject = ['$routeProvider', '$locationProvider', '$translateProvider', 'toastyConfigProvider'];

  function config($routeProvider, $locationProvider, $translateProvider, toastyConfigProvider) {
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
        .when('/path/:path*', {
          templateUrl: 'views/path.html',
          controller : 'PathController',
          controllerAs: 'vm'
        })
        .when('/task-list', {
          templateUrl: 'views/task-list.html',
          controller : 'TaskListController',
          controllerAs: 'vm'
        })
        .when('/task-launch/:taskId', {
          templateUrl: 'views/task-launch.html',
          controller : 'TaskLaunchController',
          controllerAs: 'vm'
        })
        .when('/task-preview/:taskId', {
          templateUrl: 'views/task-preview.html',
          controller : 'TaskPreviewController',
          controllerAs: 'vm'
        })
        .when('/task-run/:taskId', {
          templateUrl: 'views/task-run.html',
          controller : 'TaskRunController',
          controllerAs: 'vm'
        })
        .when('/task-delete/:taskId', {
          templateUrl: 'views/task-list.html',
          controller : 'TaskDeleteController',
          controllerAs: 'vm'
        })
        .when('/task-clone/:taskId', {
          templateUrl: 'views/task-list.html',
          controller : 'TaskCloneController',
          controllerAs: 'vm'
        })
        .when('/task-edit/:taskId', {
          templateUrl: 'views/task-edit.html',
          controller : 'TaskEditController',
          controllerAs: 'vm'
        })
        .when('/task-template-list', {
          templateUrl: 'views/task-template-list.html',
          controller : 'TaskTemplateListController',
          controllerAs: 'vm'
        })
        .when('/task-create/:className*', {
          templateUrl: 'views/task-create.html',
          controller : 'TaskCreateController',
          controllerAs: 'vm'
        })
        .when('/help', {
          templateUrl: 'views/help.html',
          controller : 'HelpController',
          controllerAs: 'vm'
        })
        .when('/exit', {
          templateUrl: 'views/exit.html',
          controller : 'ExitController',
          controllerAs: 'vm'
        })
        .otherwise({
          redirectTo: '/'
        });

    $locationProvider.html5Mode(true);

    $translateProvider.useStaticFilesLoader({
      prefix: 'resources/i18n/locale-',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('sanitize');

    // configure toasty messaging
    toastyConfigProvider.setConfig({
      limit       : 10,                // {int} Maximum number of toasties to show at once
      clickToClose: false,      // {bool} Whether clicking the toasty closes it
      position    : 'bottom-right', // {string:bottom-right,bottom-left,top-right,top-left} The window position where the toast pops up
      timeout     : 3000,            // {int} How long (in miliseconds) the toasty shows before it's removed. Set to false to disable.
      sound       : false,             // {bool} Whether to play a sound when a toast is added
      html        : true,               // {bool} Whether HTML is allowed in toasts
      shake       : false,             // {bool} Whether to shake the toasts
      theme       : 'bootstrap'        // {string} What theme to use; default, material or bootstrap
    });

  }
})();