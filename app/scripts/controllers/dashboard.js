'use strict';

var DashboardController = function ($scope, RootsService, FavoritesService) {

  //$http.get('http://localhost:8080/filesystem-roots').then(function (response) {
  //  var rootList = response.data;
  //  for (var i in rootList) {
  //    rootList[i].pathEncoded = base64.encode(rootList[i].path);
  //  }
  //  $scope.rootList = rootList;
  //  console.log($scope.rootList);
  //});

  /*$http.get('http://localhost:8080/filesystem-favorites').then(function (response) {
   var favoriteList = response.data;
   for (var i in favoriteList) {
   favoriteList[i].pathEncoded = base64.encode(favoriteList[i].path);
   }
   $scope.favoriteList = favoriteList;
   console.log($scope.favoriteList);
   });*/
  RootsService.loadRoots(function() {
    $scope.rootList = RootsService.getRoots();
  });

  FavoritesService.loadFavorites(function() {
    $scope.favoriteList = FavoritesService.getFavorites();
  });

};

DashboardController.$inject = ['$scope', 'RootsService', 'FavoritesService'];
angularApp.controller('DashboardController', DashboardController);