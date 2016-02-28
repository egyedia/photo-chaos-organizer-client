/*global angularApp*/
'use strict';

var PathController = function ($scope, $routeParams, $http, base64, FavoritesService, PathService, DataService) {

  $scope.renderingContentsFinished = function () {
    var entryList = DataService.getAppData().pathData.entryList;
    for (var i in entryList) {
      var e = entryList[i];
      if (!e.isDir && e.fileType.canHaveMeta && e.fileType.canShowThumb) {
        e.img = 'http://localhost:8080/filesystem-meta-thumbnail-data/' + e.linkPath;
        (function (currentEntry) {
          $http.get('http://localhost:8080/filesystem-meta-thumbnail-meta/' + currentEntry.linkPath).then(function (response) {
            var orientation = response.data.orientation;
            var cssClass = '';
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
            //DataService.getPathEntry(currentEntry.name).hideIcon = true;
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
    PathService.getPathContents($routeParams.path, function () {
      $scope.pco = DataService.getAppData();
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

PathController.$inject = ['$scope', '$routeParams', '$http', 'base64', 'FavoritesService', 'PathService',
                          'DataService'];
angularApp.controller('PathController', PathController);