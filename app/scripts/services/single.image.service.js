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

    //TODO: have this as a directive
    // The external video player checkbox should be more angular-style
    // The state of the checkbox should be preserved between folder changes

    function cleanVideoCanvas() {
      jq("#videoCanvas")[0].pause();
      jq("#videoCanvas").attr("src", null);
      jq("#videoCanvas").hide();
    }

    function cleanImageCanvas() {
      jq("#imageCanvas").hide();
    }

    function showImage(entry, image) {
      var ctx = {};

      // Fet metadata
      ctx.meta = DataService.getMetaInfo(entry.name);
      // Get big image data
      ctx.originalBigImageSize = RotationService.getBigImageBaseSize(ctx.meta, image);
      // Compute rotated image data
      ctx.rotatedBigImageSize = RotationService.getRotatedDisplaySize(ctx.originalBigImageSize);

      resizeMediaDisplayArea(ctx, 'image');

      // Save the Context
      var context = ctx.canvas.getContext('2d');
      /*context.beginPath();
       context.lineWidth = "10";
       context.strokeStyle = "#aa0000";
       context.rect(0, 0, fullAvailableAreaSize.width, fullAvailableAreaSize.height);
       context.stroke();*/
      context.save();

      // Translate and Rotate
      if (!ctx.inFullScreen) {
        context.translate(ctx.translationAndSize.tx, ctx.translationAndSize.ty);
      } else {
        context.translate(ctx.translationAndSize.tx + ctx.left, ctx.translationAndSize.ty + ctx.top);
      }
      context.rotate(RotationService.getRadians(ctx.originalBigImageSize.orientation));

      // Draw the Image
      context.drawImage(image, 0, 0, ctx.translationAndSize.width, ctx.translationAndSize.height);
    }

    function showVideo(entry) {
      var ctx = {};

      resizeMediaDisplayArea(ctx, 'video');

      ctx.videoCanvas.attr("src", UrlService.filesystemRange(entry.fullPath));
    }

    function showUnknown(entry) {
      var ctx = {};
      resizeMediaDisplayArea(ctx, 'unknown');
    }

    function resizeMediaDisplayArea(ctx, fileType) {
      // TODO instead of file type, have display type:
      // image
      // video
      // unknown
      // external video - clickable if not in full screen
      // folder - clickable, if not in full screen
      // symlink ????
      // TODO - have separate icon for all these
      ctx.fullAvailableAreaSize = null;
      ctx.marginx = 20;
      ctx.marginy = 20;
      ctx.inFullScreen = service.inFullScreen();

      // Get Display Width and Height
      if (ctx.inFullScreen) {
        ctx.marginx = 0;
        ctx.marginy = 0;
        ctx.fullAvailableAreaSize = new ImageSize(screen.width, screen.height);
      } else {
        ctx.fullAvailableAreaSize = new ImageSize(jq(window).width(), jq(window).height());
      }

      // Shrink availableAreaSize by the preset margins
      ctx.availableAreaSize = new ImageSize(
          ctx.fullAvailableAreaSize.width - 2 * ctx.marginx,
          ctx.fullAvailableAreaSize.height - 2 * ctx.marginy);

      if (fileType == 'image') {
        // Compute the final size of the area where the image will be rendered
        ctx.renderingSize = RotationService.getRenderingSize(ctx.rotatedBigImageSize, ctx.availableAreaSize);
        // Compute Translation X and Y, as well as Image Width and Height based on rotation angle
        ctx.translationAndSize = RotationService.computeTranslationAndSize(ctx.renderingSize);
      } else {
        // Use the whole available area
        ctx.renderingSize = ctx.availableAreaSize;
      }

      jq("#fancyWrapper").show();
      // Get canvas HTML object, based on fileType
      ctx.imageCanvas = jq("#imageCanvas");
      ctx.videoCanvas = jq("#videoCanvas");
      ctx.canvas = jq("#" + fileType + "Canvas")[0];
      var canvas = ctx.canvas;

      // Set canvas (HTML canvas or video or div) Width and Height
      if (ctx.inFullScreen) {
        canvas.width = screen.width;
        canvas.height = screen.height;
      } else {
        canvas.width = ctx.renderingSize.width;
        canvas.height = ctx.renderingSize.height;
      }

      var canvasContainer = jq("#imageCanvasContainer");
      canvasContainer.width(canvas.width);
      canvasContainer.height(canvas.height);

      var pcoImage = jq("#pcoimage");
      pcoImage.width(canvas.width);
      pcoImage.height(canvas.height);

      // Compute the top left corner positions for centering the wrapper
      ctx.left = (ctx.fullAvailableAreaSize.width - ctx.renderingSize.width) / 2;
      ctx.top = (ctx.fullAvailableAreaSize.height - ctx.renderingSize.height) / 2;

      // Center the wrapper
      if (!ctx.inFullScreen) {
        jq("#canvasWrapper").css("top", ctx.top).css("left", ctx.left);
      }
    }

    function showTitleAndDate(fileType, title, date) {
      $timeout(function () {
        jq("#videoCanvas").toggle(fileType == 'video');
        jq('#imageCanvas').toggle(fileType == 'image');
        jq('#unknownCanvas').toggle(fileType == 'unknown');
        $rootScope.bigImageFileName = title;
        $rootScope.bigImageDate = date;
      });
    }

    service.showOneImage = function (index, fromPathView) {
      var entry = DataService.getPathDataEntry(index);
      var currentMode = DataService.getAppMode();

      var alreadyHandled = false;

      cleanVideoCanvas();
      cleanImageCanvas();

      var fileType = entry.fileType.fileType;

      if (fileType == 'image') {
        var dateString = "";
        var meta = DataService.getMetaInfo(entry.name);
        if (meta != null && meta.image.dateTimeOriginalRead) {
          var date = new Date();
          date.setTime(meta.image.dateTimeOriginal);
          dateString = date.toISOString();
        }
        showTitleAndDate(fileType, entry.name, dateString);
        currentImageIdx = index;

        var url = UrlService.filesystemRawId(entry.fullPath);
        var image = new Image();
        image.addEventListener("load", function () {
          showImage(entry, image);
        }, false);
        image.src = url;
        alreadyHandled = true;
      } else if (entry.fileType.fileType == 'video') {
        var useExternal = DataService.useExternalVideoPlayer();
        if (!useExternal || !fromPathView) {
          showTitleAndDate(fileType, entry.name, '');
        }
        if (useExternal) {
          // TODO show video icon instead of unknown. Make it clickable if not in full screen
          showTitleAndDate('unknown', entry.name, '');
          if (!service.inFullScreen()) {
            AppControlService.launchExternalVideo(entry.fullPath);
          } else {
            // TODO show warning that external player won't be launched in full screen mode
          }
        } else {
          showVideo(entry);
        }
        alreadyHandled = true;
      } else if (entry.isDir) {
        if (!fromPathView) {
          showTitleAndDate('unknown', entry.name, '');
          showUnknown(entry);
        }
        alreadyHandled = true;
      }

      if (!alreadyHandled) {
        showTitleAndDate('unknown', entry.name, '');
        showUnknown(entry);
      }

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

    };

    service.closeGallery = function () {
      cleanVideoCanvas();
      cleanImageCanvas();
      DataService.popAppMode();
      jq("#fancyWrapper").hide();
    };

    service.next = function () {
      currentImageIdx++;
      if (currentImageIdx >= DataService.getPathDataEntrySize()) {
        currentImageIdx = 0;
      }
      this.showOneImage(currentImageIdx, false);
    };

    service.previous = function () {
      currentImageIdx--;
      if (currentImageIdx < 0) {
        currentImageIdx = DataService.getPathDataEntrySize() - 1;
      }
      this.showOneImage(currentImageIdx, false);
    };

    service.fullScreen = function () {
      jq(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', function (e) {
        //console.log("fullscreen event: " + service.inFullScreen());
        service.showOneImage(currentImageIdx, false);
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
