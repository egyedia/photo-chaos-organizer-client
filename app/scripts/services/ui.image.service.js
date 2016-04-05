(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('UIImageService', UIImageService);

  UIImageService.$inject = ['RotationService'];

  function UIImageService(RotationService) {

    var service = {};

    service.getRotationClassFromMeta = function (meta) {
      var orientation = null;
      if (meta.thumbnail.orientationRead) {
        orientation = meta.thumbnail.orientation;
      } else if (meta.image.orientationRead) {
        orientation = meta.image.orientation;
      }
      return RotationService.getRotationCssClass(orientation);
    };

    return service;
  };
})();
