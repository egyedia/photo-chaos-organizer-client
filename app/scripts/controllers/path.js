(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('PathController', PathController);

  PathController.$inject = ['$routeParams', 'FavoritesService', 'PathService', 'DataService', 'UsersService'];

  function PathController($routeParams, FavoritesService, PathService, DataService, UsersService) {
    var vm = this;

    UsersService.initialize();
    if (UsersService.redirectIfNeeded()) {
      return;
    }

    vm.renderingContentsFinished = function () {
      PathService.startLoadingThumbnails();
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