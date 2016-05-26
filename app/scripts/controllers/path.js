(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('PathController', PathController);

  PathController.$inject = ['$routeParams', 'FavoritesService', 'PathService', 'DataService', 'Application',
                            'SingleImageService', 'FolderOperationsService', 'NotificationService', 'CONST',
                            '$location', '$timeout'];

  function PathController($routeParams, FavoritesService, PathService, DataService, Application, SingleImageService,
                          FolderOperationsService, NotificationService, CONST, $location, $timeout) {
    var vm = this;

    vm.breadcrumbRenderedDone = function () {
      vm.breadcrumbRendered = true;
    };

    vm.renderingContentsFinished = function () {
      PathService.startLoadingThumbnails();
    };

    vm.getPathContents = function () {
      PathService.getPathContents($routeParams.path).then(function () {
        vm.pco = DataService.getAppData();
        vm.isAtRoot = vm.pco.pathData.parentList.length == 1;
      }).catch(function (error) {
        if (error.status == 404) {
          NotificationService.showError('pathNotFound', {"path": $routeParams.path});
          $location.path('/');
        } else {
          NotificationService.showError('errorReadingLocation',
              {"path": $routeParams.path, "errorText": error.data.errorText});
        }
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
      if (DataService.getAppMode() == CONST.appMode.PATH_RENAME) {
        vm.endEditingFolderName(false);
      }
      SingleImageService.showOneImage($index, true);
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
        DataService.pushAppMode(CONST.appMode.PATH_RENAME);
        vm.folderNameEditorObject = vm.pco.pathData.parentList[size - 1];
        vm.folderNameEditorName = vm.folderNameEditorObject.name
        vm.folderNameEditorActive = true;
        $timeout(function () {
          jq('#folderNameEditor').focus();
          var l = jq('#folderNameEditor').val().length;
          jq('#folderNameEditor')[0].setSelectionRange(l, l);
        });
      }
    };

    vm.endEditingFolderName = function (doApply) {
      vm.folderNameEditorActive = false;
      DataService.popAppMode();
      if (doApply) {
        if (vm.folderNameEditorObject.name != vm.folderNameEditorName) {
          FolderOperationsService.renameFolder(vm.folderNameEditorObject,
              vm.folderNameEditorName).then(function (response) {
                if (response.data.renamed) {
                  // TODO have this in a util, together with UIServices....
                  // TODO handle 404 here and everywhere / from the UI
                  var linkPath = '/path/file://' + response.data.path;
                  $location.path(linkPath);
                }
              });
        } else {
          //console.log("No rename");
        }
      } else {
        //console.log("revert");
      }
    };

    Application.launch(function () {
      vm.breadcrumbRendered = false;
      DataService.getAppData().controller = vm;
      DataService.setAppMode(CONST.appMode.PATH);
      // make sure favorites are loaded
      // the load path contents
      if (FavoritesService.isInitialized()) {
        vm.getPathContents();
      } else {
        vm.loadFavoritesAndPathContents();
      }
    });

  }
})();