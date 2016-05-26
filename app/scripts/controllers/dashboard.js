(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['Application', 'RootsService', 'FavoritesService', 'UsersService', 'DataService',
                                 'CONST'];

  function DashboardController(Application, RootsService, FavoritesService, UsersService, DataService, CONST) {
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

    Application.launch(function () {
      vm.rootList = [];
      vm.favoriteList = [];
      DataService.setAppMode(CONST.appMode.PAGE);
      vm.loadAll();
    });
    
  }
})();