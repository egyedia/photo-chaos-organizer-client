(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('PathService', PathService);

  PathService.$inject = ['$http', '$timeout', 'base64', 'FavoritesService', 'DataService', 'UrlService',
                         'ConfigService'];

  function PathService($http, $timeout, base64, FavoritesService, DataService, UrlService, ConfigService) {

    var service = {};

    service.getPathContents = function (encodedPath, callback) {
      $http.get(UrlService.filesystemPathContentsId(encodedPath)).then(function (response) {
        var data = response.data;
        var entryList = new FSEntryList();
        var entryMap = {};
        var pathInfo = data.pathInfo;
        for (var i in data.entryList) {
          var e = data.entryList[i];
          if (!e.attributes.hidden) {
            var entry = new FSEntry();
            var fullPath = pathInfo.path + "/" + e.name;
            entry.linkPath = base64.encode(fullPath);
            entry.fullPath = fullPath;
            entry.name = e.name;
            entry.isDir = (e.entryType === 'dir');
            entry.cssClass = '';
            entry.index = i;
            entry.fileType = e.fileType;
            entry.hideIcon = false;
            if (entry.isDir) {
              entry.iconClass = "font-svg-folder";
            } else if (e.fileType.fileType == 'video') {
              entry.iconClass = "font-svg-video";
            } else if (e.fileType.fileType == 'image') {
              entry.iconClass = "font-svg-image";
            } else if (e.fileType.fileType == 'other') {
              entry.iconClass = "font-svg-file";
            }
            entry.isFavorite = FavoritesService.isFavorite(fullPath);
            entryList.push(entry);
            entryMap[entry.name] = entry;
          }
        }

        var pathData = new FSPathData();
        pathData.entryList = entryList;
        pathData.entryMap = entryMap;
        pathData.requestedLocation = pathInfo.path;
        pathData.locationIsRoot = pathInfo.isRoot;
        pathData.parentPath = pathInfo.parentPath == null ? null : base64.encode(pathInfo.parentPath);

        var parentList = [];
        for (var i in response.data.parentList) {
          var p = response.data.parentList[i];
          parentList.push({
            name    : p.name,
            linkPath: base64.encode(p.path)
          });
        }
        pathData.parentList = parentList;
        DataService.setPathData(pathData);
        callback();
      });
    };

    service.loadThumb = function (e) {
      if (!e.isDir && e.fileType.canHaveMeta && e.fileType.canShowThumb) {
        e.img = UrlService.filesystemMetaThumbnailDataId(e.linkPath);
        (function (currentEntry) {
          $http.get(UrlService.filesystemMetaThumbnailMetaId(currentEntry.linkPath)).then(function (response) {
            var orientation = response.data.orientation;
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
            DataService.getPathEntry(currentEntry.name).cssClass = cssClass;
          });
        })(e);
      }
    };

    service.loadNextThumb = function () {
      var start = this.thumbLoadingIndex;
      var end = start + ConfigService.getThumbShowBatchSize();
      if (end > this.thumbEntryList.length) {
        end = this.thumbEntryList.length;
      }
      for (this.thumbLoadingIndex = start; this.thumbLoadingIndex < end; this.thumbLoadingIndex++) {
        this.loadThumb(this.thumbEntryList[this.thumbLoadingIndex]);
      }
      if (this.thumbLoadingIndex < this.thumbEntryList.length) {
        $timeout(function () {
          service.loadNextThumb()
        }, ConfigService.getThumbShowTimeout());
      }
    };

    service.startLoadingThumbnails = function () {
      this.thumbEntryList = DataService.getAppData().pathData.entryList;
      this.thumbLoadingIndex = 0;
      service.loadNextThumb();
    };

    return service;

  };
})();