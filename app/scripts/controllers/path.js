(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('PathController', PathController);

  PathController.$inject = ['$routeParams', 'FavoritesService', 'PathService', 'DataService', 'UsersService',
                            'UrlService', 'SingleImageService'];

  function PathController($routeParams, FavoritesService, PathService, DataService, UsersService, UrlService,
                          SingleImageService) {
    var vm = this;

    var currentImage = null;
    var currentImageIdx = null;

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

    vm.thumbClicked = function ($index) {
      var entry = DataService.getPathDataEntry($index);
      if (entry.fileType.fileType == 'image') {
        currentImageIdx = $index;
        SingleImageService.openGallery(entry, $index);
      }
    };

    vm.closeSingleImage = function () {
      SingleImageService.closeGallery();
    };

    vm.nextSingleImage = function () {
      currentImageIdx++;
      if (currentImageIdx >= DataService.getPathDataEntrySize()) {
        currentImageIdx = 0;
      }
      vm.thumbClicked(currentImageIdx);
    };

    vm.previousSingleImage = function () {
      currentImageIdx--;
      if (currentImageIdx < 0) {
        currentImageIdx = DataService.getPathDataEntrySize() - 1;
      }
      vm.thumbClicked(currentImageIdx);
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