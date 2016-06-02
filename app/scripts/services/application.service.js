(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('Application', Application);

  Application.$inject = ['$http', 'UrlService', 'UsersService', 'NotificationService', 'DataService'];

  function Application($http, UrlService, UsersService, NotificationService, DataService) {

    var service = {};

    service.launch = function (controllerCallback) {
      if (!UrlService.portWasSet()) {
        var url = UrlService.settingsDynamic();
        $http.get(url).then(function (response) {
          UrlService.injectPort(response.data.port);
          service.checkCurrentUser(controllerCallback);
        }).catch(function (response) {
          if (response.status == 404) {
            console.log("The '404 Not Found' is expected in development.");
            var url = UrlService.settingsStatic();
            $http.get(url).then(function (response) {
              UrlService.injectPort(response.data.port);
              service.checkCurrentUser(controllerCallback);
            }).catch(function (response) {
              NotificationService.showError('settingsNotFound',
                  {"url": url, "status": response.status, "statusText": response.statusText});
            });
          } else {
            NotificationService.showError('settingsNotFound',
                {"url": url, "status": response.status, "statusText": response.statusText});
          }
        });
      } else {
        service.checkCurrentUser(controllerCallback);
      }
    };

    service.checkCurrentUser = function (controllerCallback) {
      UsersService.initialize();
      if (UsersService.redirectIfNeeded()) {
        return;
      }
      service.loadFrontendSettings(controllerCallback);
    };

    service.loadFrontendSettings = function (controllerCallback) {
      var url = UrlService.settingsFrontend();
      $http.get(url).then(function (response) {
        DataService.setFrontendSettings(response.data);
        controllerCallback();
      }).catch(function (response) {
        NotificationService.showError('settingsFrontendNotFound',
            {"url": url, "status": response.status, "statusText": response.statusText});
      });
    };

    return service;
  };
})();
