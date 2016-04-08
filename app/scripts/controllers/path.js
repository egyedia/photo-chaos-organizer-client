(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('PathController', PathController);

  PathController.$inject = ['$routeParams', 'FavoritesService', 'PathService', 'DataService', 'UsersService',
                            'SingleImageService', 'FolderOperationsService', 'CONST'];

  function PathController($routeParams, FavoritesService, PathService, DataService, UsersService, SingleImageService,
                          FolderOperationsService, CONST) {
    var vm = this;

    DataService.getAppData().controller = vm;

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
        vm.isAtRoot = vm.pco.pathData.parentList.length == 1;
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
      SingleImageService.openGallery($index);
    };

    vm.closeSingleImage = function () {
      SingleImageService.closeGallery();
    };

    vm.nextSingleImage = function () {
      SingleImageService.next();
    };

    vm.previousSingleImage = function () {
      SingleImageService.previous();
    };

    vm.startEditingFolderName = function () {
      if (!vm.isAtRoot) {
        var size = vm.pco.pathData.parentList.length;
        DataService.setAppMode(CONST.appMode.PATH_RENAME);
        vm.folderNameEditorObject = vm.pco.pathData.parentList[size - 1];
        vm.folderNameEditorName = vm.folderNameEditorObject.name
        vm.folderNameEditorActive = true;
      }
    };

    vm.endEditingFolderName = function (doApply) {
      vm.folderNameEditorActive = false;
      DataService.setAppMode(CONST.appMode.PATH);
      if (doApply) {
        if (vm.folderNameEditorObject.name != vm.folderNameEditorName) {
          FolderOperationsService.renameFolder(vm.folderNameEditorObject, vm.folderNameEditorName);
        } else {
          //console.log("No rename");
        }
      } else {
        //console.log("revert");
      }
    };

    DataService.setAppMode(CONST.appMode.PATH);

    // make sure favorites are loaded
    // the load path contents
    if (FavoritesService.isInitialized()) {
      vm.getPathContents();
    } else {
      vm.loadFavoritesAndPathContents();
    }

  }
})();