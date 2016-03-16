(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('UIEntryService', UIEntryService);

  UIEntryService.$inject = [];

  function UIEntryService() {

    var service = {};

    service.getIconClass = function (e) {
      var iconClass = null;

      if (e.readError) {
        if (e.entryType === 'dir') {
          iconClass = "font-svg-folder icon-unreadable";
        } else {
          iconClass = "font-svg-file icon-unreadable";
        }
      } else {
        if (e.entryType === 'dir') {
          iconClass = "font-svg-folder icon-folder";
        } else if (e.fileType.fileType == 'video') {
          iconClass = "font-svg-video icon-video";
        } else if (e.fileType.fileType == 'video-meta') {
          iconClass = "font-svg-video-meta icon-video-meta";
        } else if (e.fileType.fileType == 'image') {
          iconClass = "font-svg-image icon-image";
        } else if (e.fileType.fileType == 'image-raw') {
          iconClass = "font-svg-image icon-image-raw";
        } else if (e.fileType.fileType == 'thumbnail') {
          iconClass = "font-svg-thumbnail icon-thumbnail";
        } else if (e.fileType.fileType == 'sound') {
          iconClass = "font-svg-sound icon-sound";
        } else if (e.fileType.fileType == 'other') {
          iconClass = "font-svg-file icon-file";
        }
      }
      return iconClass;
    };

    service.getFullPath = function (path, name) {
      var fullPath = path;
      // if ends in a /, do not add one more
      if (fullPath.substring(fullPath.length - 1, fullPath.length) != "/") {
        fullPath += "/";
      }
      fullPath += name;
      return fullPath;
    };

    service.getLinkPath = function (e, fullPath) {
      var linkPath = '#';
      if (!e.readError) {
        if (e.entryType === 'dir') {
          linkPath = '/path/file://' + fullPath;
        }
      }
      return linkPath;
    };

    return service;
  };
})();
