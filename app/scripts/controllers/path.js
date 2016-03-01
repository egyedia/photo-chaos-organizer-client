(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('PathController', PathController);

  PathController.$inject = ['$routeParams', '$http', 'FavoritesService', 'PathService', 'DataService'];

  function PathController($routeParams, $http, FavoritesService, PathService, DataService) {
    var vm = this;

    vm.renderingContentsFinished = function () {
      var entryList = DataService.getAppData().pathData.entryList;
      for (var i in entryList) {
        var e = entryList[i];
        if (!e.isDir && e.fileType.canHaveMeta && e.fileType.canShowThumb) {
          e.img = 'http://localhost:8080/filesystem-meta-thumbnail-data/' + e.linkPath;
          (function (currentEntry) {
            $http.get('http://localhost:8080/filesystem-meta-thumbnail-meta/' + currentEntry.linkPath).then(function (response) {
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
              //DataService.getPathEntry(currentEntry.name).hideIcon = true;
            });
          })(e);
        }
      }
    };

    vm.addOrRemoveFavorite = function (path, isFavorite) {
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
        vm.pco = DataService.getAppData();
      });
    };

    // make sure favorites are loaded
    // the load path contents
    if (FavoritesService.isInitialized()) {
      getPathContents();
    } else {
      FavoritesService.loadFavorites(getPathContents);
    }

  }
})();