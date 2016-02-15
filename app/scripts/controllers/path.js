/*global angularApp*/
'use strict';

var PathController = function ($scope, $routeParams, $http, base64) {

  var contentList = null;
  var filename2contentMap = null;
  $scope.contentList = [];

  $scope.renderingContentsFinished = function () {
    for (var i in contentList) {
      var e = contentList[i];
      if (!e.isDir) {
        e.img = 'http://localhost:8080/filesystem-meta-thumbnail-data/' + e.linkPath;
        $http.get('http://localhost:8080/filesystem-meta-thumbnail-meta/' + e.linkPath).then(function (response) {
          var filename = base64.decode(e.linkPath);
          var content = filename2contentMap[filename];
          var orientation = response.data.orientation;
          if (orientation == 6) {
            content.cssClass = 'rotateCW';
          } else if (orientation == 8) {
            content.cssClass = 'rotateCCW';
          } else if (orientation == 3) {
            content.cssClass = 'rotate180';
          }
        });
      }
    }
  };

  $http.get('http://localhost:8080/filesystem-path-contents/' + $routeParams.path).then(function (response) {
    var data = response.data;
    contentList = [];
    filename2contentMap = {};
    var pathInfo = data.pathInfo;
    for (var i in data.contentList) {
      var e = data.contentList[i];
      var content = {};
      var filename = pathInfo.path + "/" + e.name;
      content.linkPath = base64.encode(filename);
      content.name = e.name;
      content.isDir = e.attributes.isDir;
      content.cssClass = '';
      content.index = i;
      if (content.isDir) {
        content.iconClass = "font-svg-folder";
      } else {
        content.iconClass = "font-svg-file";
        content.hideIcon = true;
      }
      contentList.push(content);
      filename2contentMap[filename] = content;
    }

    $scope.contentList = contentList;
    $scope.requestedLocation = pathInfo.path;
    $scope.locationIsRoot = pathInfo.isRoot;
    $scope.parentPath = pathInfo.parentPath == null ? null : base64.encode(pathInfo.parentPath);
  });


};

PathController.$inject = ["$scope", "$routeParams", "$http", "base64"];
angularApp.controller('PathController', PathController);