'use strict';

var RootsService = function ($http, base64) {

  var roots = [];

  var service = {};

  service.loadRoots = function (callback) {
    $http.get('http://localhost:8080/filesystem-roots').then(function (response) {
      var rootList = response.data;
      for (var i in rootList) {
        rootList[i].pathEncoded = base64.encode(rootList[i].path);
      }
      roots = rootList;
      callback();
    });
  };

  service.getRoots = function () {
    return roots;
  }

  return service;

};

RootsService.$inject = ['$http', 'base64'];
angularApp.service('RootsService', RootsService);