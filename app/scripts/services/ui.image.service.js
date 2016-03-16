(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('UIImageService', UIImageService);

  UIImageService.$inject = [];

  function UIImageService() {

    var service = {};

    service.getRotationClassFromMeta = function (meta) {
      var orientation = null;
      if (meta.thumbnail.orientationRead) {
        orientation = meta.thumbnail.orientation;
      } else if (meta.image.orientationRead) {
        orientation = meta.image.orientation;
      }
      var cssClass = 'rotate0';
      if (orientation == 6) {
        cssClass = 'rotateCW';
      } else if (orientation == 8) {
        cssClass = 'rotateCCW';
      } else if (orientation == 3) {
        cssClass = 'rotate180';
      } else if (orientation == 1) {
        cssClass = 'rotate0';
      }
      return cssClass;
    };

    return service;
  };
})();
