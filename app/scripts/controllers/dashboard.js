(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['RootsService', 'FavoritesService', 'UsersService', 'DataService', 'CONST'];

  function DashboardController(RootsService, FavoritesService, UsersService, DataService, CONST) {
    var vm = this;

    vm.rootList = [];
    vm.favoriteList = [];
    DataService.setAppMode(CONST.appMode.PAGE);

    UsersService.initialize();
    if (UsersService.redirectIfNeeded()) {
      return;
    }

    // load roots
    RootsService.loadRoots().then(function () {
      vm.rootList = RootsService.getRoots();
    });

    // load favorites
    FavoritesService.loadFavorites().then(function () {
      vm.favoriteList = FavoritesService.getFavorites();
    });
  }
})();