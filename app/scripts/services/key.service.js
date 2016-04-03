(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('KeyService', KeyService);

  KeyService.$inject = ['DataService', 'SingleImageService', 'CONST'];

  function KeyService(DataService, SingleImageService, CONST) {

    var service = {};

    service.event = function (e) {
      if (DataService.getAppMode() == CONST.appMode.IMAGEVIEW) {
        if (e.which == 39) {
          SingleImageService.next();
        } else if (e.which == 37) {
          SingleImageService.previous();
        } else if (e.which == 27) {
          SingleImageService.closeGallery();
        } else if (e.which == 70 && e.metaKey) {
          SingleImageService.fullScreen();
        }
      }
      /*console.log("------");
       console.log(e.char + ":" + e.charCode);
       console.log(e.key + ":" + e.keyCode);
       console.log("metaKey:" + e.metaKey);
       console.log("shiftKey:" + e.shiftKey);
       console.log("ctrlKey:" + e.ctrlKey);
       console.log("altKey:" + e.altKey);*/
      //e.preventDefault();
    };

    return service;
  };
})();
