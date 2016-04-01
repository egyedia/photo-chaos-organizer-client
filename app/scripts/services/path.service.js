(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('PathService', PathService);

  PathService.$inject = ['$q', '$http', '$timeout', 'FavoritesService', 'DataService', 'UrlService', 'ConfigService',
                         'UIImageService', 'UIEntryService'];

  function PathService($q, $http, $timeout, FavoritesService, DataService, UrlService, ConfigService, UIImageService,
                       UIEntryService) {

    var service = {};

    service.pathContentsLoaded = function (response) {
      var data = response.data;
      var entryList = new FSEntryList();
      var entryMap = {};
      var pathInfo = data.pathInfo;
      for (var i in data.entryList) {
        var e = data.entryList[i];
        var entry = new FSEntry();
        entry.fullPath = UIEntryService.getFullPath(pathInfo.path, e.name);
        entry.name = e.name;
        entry.isDir = (e.entryType === 'dir');
        entry.cssClass = '';
        entry.index = i;
        entry.fileType = e.fileType;
        entry.hideIcon = false;
        entry.iconClass = UIEntryService.getIconClass(e);
        entry.linkPath = UIEntryService.getLinkPath(e, entry.fullPath);
        entry.isFavorite = FavoritesService.isFavorite(entry.fullPath);
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
            var cssClass = UIImageService.getRotationClassFromMeta(response.data);
            DataService.getPathEntry(currentEntry.name).cssClass = cssClass;
            DataService.storeImageMeta(currentEntry.name, response.data);
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