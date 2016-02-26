'use strict';

var DashboardController = function ($scope, RootsService, FavoritesService) {

  // load roots
  RootsService.loadRoots(function () {
    $scope.rootList = RootsService.getRoots();
  });

  // load favorites
  FavoritesService.loadFavorites(function () {
    $scope.favoriteList = FavoritesService.getFavorites();
  });

};

DashboardController.$inject = ['$scope', 'RootsService', 'FavoritesService'];
angularApp.controller('DashboardController', DashboardController);