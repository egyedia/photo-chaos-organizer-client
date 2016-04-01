(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('DataService', DataService);

  DataService.$inject = ['$rootScope', 'UrlService'];

  function DataService($rootScope, UrlService) {

    var service = {};

    service.initialize = function () {
      $rootScope.appData = new AppData();
    };

    service.setFavorites = function (favoritesList) {
      var map = {};
      for (var i in favoritesList) {
        map[favoritesList[i].path] = favoritesList[i].id;
      }
      this.getAppData().favoritesMap = map;
      this.getAppData().favorites = favoritesList;
    };

    service.setPathData = function (pathData) {
      this.getAppData().pathData = pathData;
    };

    service.getAppData = function () {
      return $rootScope.appData;
    };

    service.getPathEntry = function (filename) {
      return this.getAppData().pathData.entryMap[filename];
    };

    service.setUsers = function (users) {
      this.getAppData().users = users;
    };

    service.setUserId = function (userId) {
      this.getAppData().userId = userId;
    };

    service.setUserName = function (userName) {
      this.getAppData().userName = userName;
    };

    service.getUserId = function () {
      return this.getAppData().userId;
    };

    service.setTaskTemplates = function (taskTemplates) {
      this.getAppData().taskTemplates = taskTemplates;
    };

    service.setTasks = function (tasks) {
      this.getAppData().tasks = tasks;
    };

    service.setTask = function (task) {
      this.getAppData().task = task;
    };

    service.getCurrentRawList = function () {
      var list = [];
      var entryList = this.getAppData().pathData.entryList;
      for (var i in entryList) {
        var img = {
          "href"       : UrlService.filesystemRawId(entryList[i].fullPath),
          "title"      : entryList[i].name,
          "orientation": "TODO:// read orientation"
        };
        list.push(img);
      }
      return list;
    };

    service.getPathDataEntry = function(idx) {
      return this.getAppData().pathData.entryList[idx];
    };

    service.getPathDataEntrySize = function(idx) {
      return this.getAppData().pathData.entryList.length;
    };

    service.storeImageMeta = function(name, imageMeta) {
      if (this.getAppData().pathData.metaMap == null) {
        this.getAppData().pathData.metaMap = {};
      }
      this.getAppData().pathData.metaMap[name] = imageMeta;
    }

    service.getMetaInfo = function(name) {
      return this.getAppData().pathData.metaMap[name];
    }

    return service;
  };
})();
