(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['RootsService', 'FavoritesService'];

  function DashboardController(RootsService, FavoritesService) {
    var vm = this;

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