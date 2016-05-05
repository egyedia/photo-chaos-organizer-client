(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('NotificationService', NotificationService);

  NotificationService.$inject = ['toasty', '$translate'];

  function NotificationService(toasty, $translate) {

    var service = {};

    service.showError = function (errorKey, params) {
      var titleKey = 'notification.error.title';
      var messageKey = 'notification.error.' + errorKey;
      toasty.error({
        title: $translate.instant(titleKey),
        msg  : $translate.instant(messageKey, params),
        timeout: 10000
      });
    };

    service.showSuccess = function (messageKey, params) {
      var titleKey = 'notification.success.title';
      var messageKey = 'notification.success.' + messageKey;
      toasty.success({
        title: $translate.instant(titleKey),
        msg  : $translate.instant(messageKey, params),
      });
    };

    return service;

  };
})();