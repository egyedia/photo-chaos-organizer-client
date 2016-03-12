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


    vm.getPathContents = function () {
      PathService.getPathContents($routeParams.path).then(function () {
        vm.pco = DataService.getAppData();
      });
    };

    vm.loadFavoritesAndPathContents = function () {
      FavoritesService.loadFavorites().then(function () {
        vm.getPathContents();
      });
    };

    vm.addOrRemoveFavorite = function (path, isFavorite) {
      if (!isFavorite) {
        FavoritesService.createFavorite(path).then(function () {
          vm.loadFavoritesAndPathContents();
        });
      } else {
        FavoritesService.removeFavoriteByPath(path).then(function () {
          vm.loadFavoritesAndPathContents();
        });
      }
    };

    // make sure favorites are loaded
    // the load path contents
    if (FavoritesService.isInitialized()) {
      vm.getPathContents();
    } else {
      vm.loadFavoritesAndPathContents();
    }

  }
})();