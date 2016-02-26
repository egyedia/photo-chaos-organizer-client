/*global angularApp*/
'use strict';

var PathController = function ($scope, $routeParams, $http, base64, FavoritesService, PathService) {

  $scope.contentList = [];

  $scope.renderingContentsFinished = function () {
    var contentList = PathService.getContentList();
    for (var i in contentList) {
      var e = contentList[i];
      if (!e.isDir && e.canHaveMeta === true) {
        e.img = 'http://localhost:8080/filesystem-meta-thumbnail-data/' + e.linkPath;
        (function (currentEntry) {
          $http.get('http://localhost:8080/filesystem-meta-thumbnail-meta/' + currentEntry.linkPath).then(function (response) {
            var filename = base64.decode(currentEntry.linkPath);
            var content = PathService.getFileContent(filename);
            var orientation = response.data.orientation;
            if (orientation == 6) {
              content.cssClass = 'rotateCW';
            } else if (orientation == 8) {
              content.cssClass = 'rotateCCW';
            } else if (orientation == 3) {
              content.cssClass = 'rotate180';
            } else {
              content.cssClass = 'rotate0';
            }
          });
        })(e);
      }
    }
  };

  $scope.addOrRemoveFavorite = function (path, isFavorite) {
    if (!isFavorite) {
      FavoritesService.createFavorite(path, function () {
        FavoritesService.loadFavorites(getPathContents);
      });
    } else {
      FavoritesService.removeFavoriteByPath(path, function () {
        FavoritesService.loadFavorites(getPathContents);
      });
    }
  };

  // function to launch the content loading
  var getPathContents = function () {
    var ret = PathService.getPathContents($routeParams.path, function (ret) {
      $scope.contentList = ret.contentList;
      $scope.requestedLocation = ret.requestedLocation;
      $scope.pathInfo = ret.pathInfo;
      $scope.locationIsRoot = ret.locationIsRoot;
      $scope.parentPath = ret.parentPath;
      $scope.parentList = ret.parentList;
    });
  };

  // make sure favorites are loaded
  // the load path contents
  if (FavoritesService.isInitialized()) {
    getPathContents();
  } else {
    FavoritesService.loadFavorites(getPathContents);
  }

};

PathController.$inject = ['$scope', '$routeParams', '$http', 'base64', 'FavoritesService', 'PathService'];
angularApp.controller('PathController', PathController);