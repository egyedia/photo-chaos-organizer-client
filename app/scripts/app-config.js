/*jslint node: true */
/*global angularApp */
'use strict';

var angularConfig = function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/dashboard.html',
      controller: 'DashboardController'
    })
    .when('/path/:path', {
      templateUrl: 'views/path.html',
      controller: 'PathController'
    })
    .otherwise({
      redirectTo: '/'
    });
};

angularConfig.$inject = ['$routeProvider'];
angularApp.config(angularConfig);