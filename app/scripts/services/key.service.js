(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('KeyService', KeyService);

  KeyService.$inject = ['DataService', 'SingleImageService', 'CONST', '$timeout'];

  function KeyService(DataService, SingleImageService, CONST, $timeout) {

    var service = {};

    service.event = function (e) {
      //console.log("current mode:" + DataService.getAppMode());
      if (DataService.getAppMode() == CONST.appMode.IMAGEVIEW) {
        if (e.which == 39) {
          SingleImageService.next();
        } else if (e.which == 37) {
          SingleImageService.previous();
        } else if (e.which == 27) {
          SingleImageService.closeGallery();
        } else if (e.which == 70 && (e.metaKey || e.ctrlKey)) {
          SingleImageService.fullScreen();
        }
      } else {
        if (e.which == 113 || (e.which == 117 && e.shiftKey)) {
          if (DataService.getAppMode() == CONST.appMode.PATH) {
            $timeout(function () {
              DataService.getAppData().controller.startEditingFolderName();

            });
          }
        }
        if (e.which == 27) {
          if (DataService.getAppMode() == CONST.appMode.PATH_RENAME) {
            $timeout(function () {
              DataService.getAppData().controller.endEditingFolderName(false);
            });
          }
        }
        if (e.which == 13) {
          if (DataService.getAppMode() == CONST.appMode.PATH_RENAME) {
            $timeout(function () {
              DataService.getAppData().controller.endEditingFolderName(true);
            });
          }
        }
      }
    };

    return service;
  };
})();
