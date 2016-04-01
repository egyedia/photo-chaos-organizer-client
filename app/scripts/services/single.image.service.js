(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('SingleImageService', SingleImageService);

  SingleImageService.$inject = ['UrlService', 'DataService'];

  function SingleImageService(UrlService, DataService) {

    var service = {};

    function resizeImage(entry, index, image) {
      console.log("SingleImageService.resizeImage");
      var meta = DataService.getMetaInfo(entry.name);
      console.log(meta);

      // Initialize big Image Width, Height and Orientation from meta
      var biw = meta.image.width;
      var bih = meta.image.height;
      var bio = meta.image.orientation;

      // Fall back if data not available
      if (biw == 0) {
        biw = image.width;
      }
      if (bih == 0) {
        bih = image.height;
      }

      // Decide if canvas rotation is needed based on orientation (switch Width with Height)
      // Also compute rotation angle
      var switchWH = false;
      var angle = 0;
      if (bio == 6) {
        switchWH = true;
        angle = 90;
      } else if (bio == 8) {
        switchWH = true;
        angle = -90;
      } else if (bio == 3) {
        angle = 180;
      } else if (bio == 1) {
        angle = 0;
      }

      // Store Big Image Display Width and Height
      var bidw = biw;
      var bidh = bih;
      if (switchWH) {
        bidw = bih;
        bidh = biw;
      }

      // Get Display Width and Height
      var dw = jq(window).width();
      var dh = jq(window).height();

      // Compute the Maximum Canvas Width and Height using the display area sizes and margins
      var marginx = 40;
      var marginy = 40;
      var mcw = dw - 2 * marginx;
      var mch = dh - 2 * marginy;

      // Compute Image Ratio and Canvas Ratio
      var ir = bidw / bidh;
      var cr = mcw / mch;

      // Compute Target Width and Height
      var tw = null;
      var th = null;
      if (ir > cr) {
        tw = mcw;
        th = tw / ir;
      } else {
        th = mch;
        tw = th * ir;
      }

      // Compute Translation X and Y, as well as Image Width and Height based on rotation angle
      var tx = 0;
      var ty = 0;
      var imgw = tw;
      var imgh = th;
      if (bio == 6) {
        tx = tw;
        imgw = th;
        imgh = tw;
      } else if (bio == 8) {
        ty = th;
        imgw = th;
        imgh = tw;
      } else if (bio == 3) {
      } else if (bio == 1) {
      }

      // Show wrapper
      jq("#fancyWrapper").show();

      // Get canvas HTML object
      var canvas = jq("#imageCanvas")[0];

      // Set Canvas Width and Height
      canvas.width = tw;
      canvas.height = th;

      // Compute the top left corner positions for centering the wrapper
      var left = (dw - tw) / 2;
      var top = (dh - th) / 2;

      // Center the wrapper
      jq("#canvasWrapper").css("top", top).css("left", left);

      // Save the Context
      var context = canvas.getContext('2d');
      context.save();

      var TO_RADIANS = Math.PI / 180;

      // Translate and Rotate
      context.translate(tx, ty);
      context.rotate(angle * TO_RADIANS);

      // Draw the Image
      context.drawImage(image, 0, 0, imgw, imgh);

    }

    service.openGallery = function (entry, index) {
      var url = UrlService.filesystemRawId(entry.fullPath);
      console.log(url);
      console.log(entry.img);
      var image = new Image();
      image.src = url;
      image.addEventListener("load", function () {
        resizeImage(entry, index, image);
      }, false);
    };

    service.closeGallery = function () {
      jq("#fancyWrapper").hide();
    };

    return service;
  };
})();
