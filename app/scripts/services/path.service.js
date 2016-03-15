(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('PathService', PathService);

  PathService.$inject = ['$q', '$http', '$timeout', 'FavoritesService', 'DataService', 'UrlService', 'ConfigService'];

  function PathService($q, $http, $timeout, FavoritesService, DataService, UrlService, ConfigService) {

    var service = {};

    service.pathContentsLoaded = function (response) {
      var data = response.data;
      var entryList = new FSEntryList();
      var entryMap = {};
      var pathInfo = data.pathInfo;
      for (var i in data.entryList) {
        var e = data.entryList[i];
        var entry = new FSEntry();
        var fullPath = pathInfo.path;
        // if ends in a /, do not add one more
        if (fullPath.substring(fullPath.length - 1, fullPath.length) != "/") {
          fullPath += "/";
        }
        fullPath += e.name;
        entry.fullPath = fullPath;
        entry.name = e.name;
        entry.isDir = (e.entryType === 'dir');
        entry.cssClass = '';
        entry.index = i;
        entry.fileType = e.fileType;
        entry.hideIcon = false;
        entry.linkPath = '#';
        if (e.readError) {
          if (entry.isDir) {
            entry.iconClass = "font-svg-folder icon-unreadable";
          } else {
            entry.iconClass = "font-svg-file icon-unreadable";
          }
        } else {
          if (entry.isDir) {
            entry.iconClass = "font-svg-folder icon-folder";
            entry.linkPath = '/path/file://' + entry.fullPath;
          } else if (e.fileType.fileType == 'video') {
            entry.iconClass = "font-svg-video icon-video";
          } else if (e.fileType.fileType == 'video-meta') {
            entry.iconClass = "font-svg-video-meta icon-video-meta";
          } else if (e.fileType.fileType == 'image') {
            entry.iconClass = "font-svg-image icon-image";
          } else if (e.fileType.fileType == 'image-raw') {
            entry.iconClass = "font-svg-image icon-image-raw";
          } else if (e.fileType.fileType == 'thumbnail') {
            entry.iconClass = "font-svg-thumbnail icon-thumbnail";
          } else if (e.fileType.fileType == 'sound') {
            entry.iconClass = "font-svg-sound icon-sound";
          } else if (e.fileType.fileType == 'other') {
            entry.iconClass = "font-svg-file icon-file";
          }
        }
        entry.isFavorite = FavoritesService.isFavorite(fullPath);
        entryList.push(entry);
        entryMap[entry.name] = entry;
      }

      var pathData = new FSPathData();
      pathData.entryList = entryList;
      pathData.entryMap = entryMap;
      pathData.requestedLocation = pathInfo.path;
      pathData.locationIsRoot = pathInfo.root;
      pathData.parentPath = pathInfo.parentPath == null ? null : pathInfo.parentPath;

      pathData.parentList = response.data.parentList;
      // show top level folder in Unix and Mac with "Files:" as link
      if (pathData.parentList.length > 0) {
        if (pathData.parentList[0].name == '/') {
          pathData.parentList[0].name = "Files:";
        }
      }
      DataService.setPathData(pathData);
    };

    service.getPathContents = function (path) {
      var defer = $q.defer();

      $http.get(UrlService.filesystemPathContentsId(path)).then(function (response) {
        service.pathContentsLoaded(response);
        defer.resolve(response);
      }).catch(function (response) {
        defer.reject(response);
      });

      return defer.promise;
    };

    service.loadThumb = function (e) {
      if (!e.isDir && e.fileType.canHaveMeta && e.fileType.canShowThumb) {
        e.img = UrlService.filesystemMetaThumbnailDataId(e.fullPath);
        (function (currentEntry) {
          $http.get(UrlService.filesystemMetaThumbnailMetaId(currentEntry.fullPath)).then(function (response) {
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