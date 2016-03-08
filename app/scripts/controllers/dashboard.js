(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['RootsService', 'FavoritesService', 'UsersService'];

  function DashboardController(RootsService, FavoritesService, UsersService) {
    var vm = this;

    UsersService.initialize();
    if (UsersService.redirectIfNeeded()) {
      return;
    }

    // load roots
    RootsService.loadRoots(function () {
      vm.rootList = RootsService.getRoots();
    });

    // load favorites
    FavoritesService.loadFavorites(function () {
      vm.favoriteList = FavoritesService.getFavorites();
    });
  }
})();