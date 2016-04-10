(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('SingleImageService', SingleImageService);

  SingleImageService.$inject = ['UrlService', 'DataService', 'RotationService', 'CONST', '$rootScope', '$timeout',
                                'AppControlService'];

  function SingleImageService(UrlService, DataService, RotationService, CONST, $rootScope, $timeout,
                              AppControlService) {

    var service = {};

    //var currentImage = null;
    var currentImageIdx = null;

    function resizeImage(entry, index, image) {
      //console.log("SingleImageService.resizeImage");
      var meta = DataService.getMetaInfo(entry.name);
      //console.log(meta);

      // Get big image data
      var originalBigImageSize = RotationService.getBigImageBaseSize(meta, image);

      // Compute rotated image data
      var rotatedBigImageSize = RotationService.getRotatedDisplaySize(originalBigImageSize);

      var fullAvailableAreaSize = null;
      var marginx = 20;
      var marginy = 20;

      var inFullScreen = service.inFullScreen();

      // Get Display Width and Height
      if (inFullScreen) {
        //console.log("in Fullscreen");
        marginx = 0;
        marginy = 0;
        fullAvailableAreaSize = new ImageSize(screen.width, screen.height);
      } else {
        //console.log("not in Fullscreen");
        fullAvailableAreaSize = new ImageSize(jq(window).width(), jq(window).height());
      }
      //console.log(fullAvailableAreaSize);

      // Shrink availableAreaSize by the preset margins
      var availableAreaSize = new ImageSize(fullAvailableAreaSize.width - 2 * marginx,
          fullAvailableAreaSize.height - 2 * marginy);

      // Compute the final size of the area where the image will be rendered
      var renderingSize = RotationService.getRenderingSize(rotatedBigImageSize, availableAreaSize);

      // Compute Translation X and Y, as well as Image Width and Height based on rotation angle
      var translationAndSize = RotationService.computeTranslationAndSize(renderingSize);

      // Show wrapper
      jq("#fancyWrapper").show();

      // Get canvas HTML object
      var canvas = jq("#imageCanvas")[0];

      // Set Canvas Width and Height
      if (inFullScreen) {
        canvas.width = screen.width;
        canvas.height = screen.height;
      } else {
        canvas.width = renderingSize.width;
        canvas.height = renderingSize.height;
      }

      var canvasContainer = jq("#imageCanvasContainer");
      canvasContainer.width(canvas.width);
      canvasContainer.height(canvas.height);
      var pcoimage = jq("#pcoimage");
      pcoimage.width(canvas.width);
      pcoimage.height(canvas.height);

      // Compute the top left corner positions for centering the wrapper
      var left = (fullAvailableAreaSize.width - renderingSize.width) / 2;
      var top = (fullAvailableAreaSize.height - renderingSize.height) / 2;

      // Center the wrapper
      if (!inFullScreen) {
        jq("#canvasWrapper").css("top", top).css("left", left);
      }


      // Save the Context
      var context = canvas.getContext('2d');
      /*context.beginPath();
       context.lineWidth = "10";
       context.strokeStyle = "#aa0000";
       context.rect(0, 0, fullAvailableAreaSize.width, fullAvailableAreaSize.height);
       context.stroke();*/
      context.save();

      // Translate and Rotate
      if (!inFullScreen) {
        context.translate(translationAndSize.tx, translationAndSize.ty);
      } else {
        context.translate(translationAndSize.tx + left, translationAndSize.ty + top);
      }
      context.rotate(RotationService.getRadians(originalBigImageSize.orientation));

      // Draw the Image
      context.drawImage(image, 0, 0, translationAndSize.width, translationAndSize.height);
    }

    service.showOneImage = function (index) {
      var entry = DataService.getPathDataEntry(index);
      var currentMode = DataService.getAppMode();
      if (entry.fileType.fileType == 'image') {
        $timeout(function () {
          $rootScope.bigImageFileName = entry.name;
          var meta = DataService.getMetaInfo(entry.name);
          if (meta.image.dateTimeOriginalRead) {
            var date = new Date();
            date.setTime(meta.image.dateTimeOriginal);
            $rootScope.bigImageDate = date.toISOString();
          }
          jq('#imageCanvas').show();
          jq('#unhandledFileType').hide();
        });
        currentImageIdx = index;

        if (currentMode == CONST.appMode.PATH) {
          DataService.pushAppMode(CONST.appMode.IMAGEVIEW);
        } else if (currentMode == CONST.appMode.IMAGEVIEW) {
          if (service.inFullScreen()) {
            DataService.pushAppMode(CONST.appMode.IMAGEVIEW_FS);
          }
        } else if (currentMode == CONST.appMode.IMAGEVIEW_FS) {
          if (!service.inFullScreen()) {
            DataService.popAppMode();
          }
        }

        var url = UrlService.filesystemRawId(entry.fullPath);
        var image = new Image();
        image.addEventListener("load", function () {
          resizeImage(entry, index, image);
        }, false);
        image.src = url;
      } else {

        if (entry.fileType.fileType == 'video' && currentMode == CONST.appMode.PATH) {
          console.log("Lunch video:" + entry.fullPath);
          AppControlService.launchExternalVideo(entry.fullPath);
        } else {
          $timeout(function () {
            $rootScope.bigImageFileName = entry.name;
            $rootScope.bigImageDate = '';
            jq('#imageCanvas').hide();
            jq('#unhandledFileType').show();
            jq("#imageCanvasContainer").css("width", 400).css("height", 200);
          });
        }
      }
    };

    service.closeGallery = function () {
      DataService.popAppMode();
      jq("#fancyWrapper").hide();
    };

    service.next = function () {
      currentImageIdx++;
      if (currentImageIdx >= DataService.getPathDataEntrySize()) {
        currentImageIdx = 0;
      }
      this.showOneImage(currentImageIdx);
    };

    service.previous = function () {
      currentImageIdx--;
      if (currentImageIdx < 0) {
        currentImageIdx = DataService.getPathDataEntrySize() - 1;
      }
      this.showOneImage(currentImageIdx);
    };

    service.fullScreen = function () {
      jq(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', function (e) {
        //console.log("fullscreen event: " + service.inFullScreen());
        service.showOneImage(currentImageIdx);
      });

      var canvasContainer = jq("#imageCanvasAndNavContainer")[0];
      this.requestFullScreen(canvasContainer);
    };

    service.requestFullScreen = function (element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    };

    service.inFullScreen = function () {
      return ((document.fullscreenElement && document.fullscreenElement !== null) ||
      document.mozFullScreen || document.webkitIsFullScreen);
    }

    return service;
  };
})();
