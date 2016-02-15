'use strict';

var DashboardController = function ($scope, $http, base64) {

  /*$scope.folderSelectedHandler = function (files) {
   // Do something with the files
   for (var i in files) {
   console.log(files[i].name + ":" + files[i].webkitRelativePath);
   }
   };*/

  $http.get('http://localhost:8080/filesystem-roots').then(function (response) {
    var rootList = response.data;
    for (var i in rootList) {
      rootList[i].pathEncoded = base64.encode(rootList[i].path);
    }
    $scope.rootList = rootList;
    console.log($scope.rootList);
  });

};

DashboardController.$inject = ["$scope", "$http", "base64"];
angularApp.controller('DashboardController', DashboardController);