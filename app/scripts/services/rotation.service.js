(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('RotationService', RotationService);

  RotationService.$inject = [];

  function RotationService() {

    var TO_RADIANS = Math.PI / 180;

    var service = {};

    service.getRotationCssClass = function (orientation) {
      if (orientation == 1) {
        return 'rotate0';
      } else if (orientation == 6) {
        return 'rotateCW';
      } else if (orientation == 8) {
        return 'rotateCCW';
      } else if (orientation == 3) {
        return 'rotate180';
      }
      return 'rotate0';
    };

    service.getDegrees = function (orientation) {
      if (orientation == 1) {
        return 0;
      } else if (orientation == 6) {
        return 90;
      } else if (orientation == 8) {
        return -90;
      } else if (orientation == 3) {
        return 180;
      }
      return 0;
    };

    service.getRadians = function (orientation) {
      return this.getDegrees(orientation) * TO_RADIANS;
    };

    service.getRotatedDisplaySize = function (original) {
      var r = new ImageSize(original.width, original.height);
      r.orientation = original.orientation;
      if (original.orientation == 6 || original.orientation == 8) {
        // set rotated size
        r.width = original.height;
        r.height = original.width;
      }
      return r;
    };

    service.getBigImageBaseSize = function (meta, image) {
      // Initialize big Image Width, Height and Orientation from meta
      var r = new ImageSize(meta.image.width, meta.image.height);
      r.orientation = meta.image.orientation;

      // Fall back if data not available
      if (r.width == 0) {
        r.width = image.width;
      }
      if (r.height == 0) {
        r.height = image.height;
      }
      return r;
    };

    service.getRenderingSize = function (imageSize, areaSize) {
      // Compute Image Ratio and Area Ratio
      var ir = imageSize.getRatio();
      var ar = areaSize.getRatio();

      // Compute Target Width and Height
      var tw = null;
      var th = null;
      if (ir > ar) {
        tw = areaSize.width;
        th = tw / ir;
      } else {
        th = areaSize.height;
        tw = th * ir;
      }
      var is = new ImageSize(Math.floor(tw), Math.floor(th));
      is.orientation = imageSize.orientation;
      return is;
    };

    service.computeTranslationAndSize = function (imageSize) {
      var tx = 0;
      var ty = 0;
      var renderingWidth = imageSize.width;
      var renderingHeight = imageSize.height;
      if (imageSize.orientation == 6) {
        tx = imageSize.width;
        renderingWidth = imageSize.height;
        renderingHeight = imageSize.width;
      } else if (imageSize.orientation == 8) {
        ty = imageSize.height;
        renderingWidth = imageSize.height;
        renderingHeight = imageSize.width;
      } else if (imageSize.orientation == 3) {
      } else if (imageSize.orientation == 1) {
      }
      var translation = {
        tx    : tx,
        ty    : ty,
        width : renderingWidth,
        height: renderingHeight
      };
      return translation;
    };

    return service;
  };
})();
