(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['Application', 'RootsService', 'FavoritesService', 'UsersService', 'DataService',
                                 '$location', 'CONST'];

  function DashboardController(Application, RootsService, FavoritesService, UsersService, DataService, $location, CONST) {
    var vm = this;

    vm.removeFavorite = function (path) {
      FavoritesService.removeFavoriteByPath(path).then(function () {
        vm.loadAll();
      });
    };

    vm.loadAll = function () {
      // load roots
      RootsService.loadRoots().then(function () {
        vm.rootList = RootsService.getRoots();
      });

      // load favorites
      FavoritesService.loadFavorites().then(function () {
        vm.favoriteList = FavoritesService.getFavorites();
      });
    };

    vm.fileSystemRootDoubleClicked = function(root) {
      $location.path("/path/file://" + root.path);
    };

    vm.favoriteDoubleClicked = function(favorite) {
      $location.path("/path/file://" + favorite.path);
    };

    Application.launch(function () {
      vm.rootList = [];
      vm.favoriteList = [];
      DataService.setAppMode(CONST.appMode.PAGE);
      vm.loadAll();
    });
    
  }
})();