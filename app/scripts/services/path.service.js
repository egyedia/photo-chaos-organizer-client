(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('PathService', PathService);

  PathService.$inject = ['$http', 'base64', 'FavoritesService', 'DataService'];

  function PathService($http, base64, FavoritesService, DataService) {

    var service = {};

    service.getPathContents = function (encodedPath, callback) {
      $http.get('http://localhost:8080/filesystem-path-contents/' + encodedPath).then(function (response) {
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

    return service;

  };
})();