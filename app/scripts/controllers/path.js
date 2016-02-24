/*global angularApp*/
'use strict';

var PathController = function ($scope, $routeParams, $http, base64, FavoritesService) {

  var contentList = null;
  var filename2contentMap = null;
  $scope.contentList = [];

  $scope.renderingContentsFinished = function () {
    for (var i in contentList) {
      var e = contentList[i];
      if (!e.isDir && e.canHaveMeta === true) {
        e.img = 'http://localhost:8080/filesystem-meta-thumbnail-data/' + e.linkPath;
        (function (currentEntry) {
          $http.get('http://localhost:8080/filesystem-meta-thumbnail-meta/' + currentEntry.linkPath).then(function (response) {
            var filename = base64.decode(currentEntry.linkPath);
            var content = filename2contentMap[filename];
            var orientation = response.data.orientation;
            if (orientation == 6) {
              content.cssClass = 'rotateCW';
            } else if (orientation == 8) {
              content.cssClass = 'rotateCCW';
            } else if (orientation == 3) {
              content.cssClass = 'rotate180';
            }
          });
        })(e);
      }
    }
  };

  $scope.getPathContents = function () {
    $http.get('http://localhost:8080/filesystem-path-contents/' + $routeParams.path).then(function (response) {
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

      $scope.contentList = contentList;
      $scope.requestedLocation = pathInfo.path;
      $scope.locationIsRoot = pathInfo.isRoot;
      $scope.parentPath = pathInfo.parentPath == null ? null : base64.encode(pathInfo.parentPath);

      var parentList = [];
      for (var i in response.data.parentList) {
        var p = response.data.parentList[i];
        parentList.push({
          name    : p.name,
          linkPath: base64.encode(p.path)
        });
      }
      $scope.parentList = parentList;

    });
  };

  $scope.addOrRemoveFavorite = function (path, isFavorite) {
    if (!isFavorite) {
      var postData = {
        'path': path
      };
      $http.post('http://localhost:8080/filesystem-favorites', postData).then(function (response) {
        console.log("favorite created");
      });
    } else {
      var id = FavoritesService.getIdForPath(path);
      $http.delete('http://localhost:8080/filesystem-favorites' + '/' + id).then(function (response) {
        console.log("favorite deleted");
      });
    }
  };


  var loadPath = function () {
    $scope.getPathContents();
  };

  if (FavoritesService.isInitialized()) {
    loadPath();
  } else {
    FavoritesService.loadFavorites(loadPath);
  }

};

PathController.$inject = ['$scope', '$routeParams', '$http', 'base64', 'FavoritesService'];
angularApp.controller('PathController', PathController);