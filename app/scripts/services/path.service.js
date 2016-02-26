'use strict';

var PathService = function ($http, base64, FavoritesService) {

  var contentList = null;
  var filename2contentMap = null;

  var service = {};

  service.getPathContents = function (encodedPath, callback) {
    $http.get('http://localhost:8080/filesystem-path-contents/' + encodedPath).then(function (response) {
      var data = response.data;
      contentList = [];
      filename2contentMap = {};
      var pathInfo = data.pathInfo;
      for (var i in data.contentList) {
        var e = data.contentList[i];
        var content = {};
        var fullPath = pathInfo.path + "/" + e.name;
        content.linkPath = base64.encode(fullPath);
        content.fullPath = fullPath;
        content.name = e.name;
        content.isDir = e.attributes.isDir;
        content.cssClass = '';
        content.index = i;
        content.canHaveMeta = e.canHaveMeta;
        if (content.isDir) {
          content.iconClass = "font-svg-folder";
        } else {
          content.iconClass = "font-svg-file";
          content.hideIcon = true;
        }
        content.isFavorite = FavoritesService.isFavorite(fullPath);
        contentList.push(content);
        filename2contentMap[fullPath] = content;
      }

      var ret = {
        contentList      : contentList,
        requestedLocation: pathInfo.path,
        locationIsRoot   : pathInfo.isRoot,
        parentPath       : pathInfo.parentPath == null ? null : base64.encode(pathInfo.parentPath)
      };

      var parentList = [];
      for (var i in response.data.parentList) {
        var p = response.data.parentList[i];
        parentList.push({
          name    : p.name,
          linkPath: base64.encode(p.path)
        });
      }
      ret.parentList = parentList;
      callback(ret);
    });
  };

  service.getFileContent = function (filename) {
    return filename2contentMap[filename];
  }

  service.getContentList = function () {
    return contentList;
  };

  return service;

};

PathService.$inject = ['$http', 'base64', 'FavoritesService'];
angularApp.service('PathService', PathService);