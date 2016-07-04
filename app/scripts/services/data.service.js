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

    service.setFrontendSettings = function (settings) {
      this.getAppData().frontendSettings = settings;
    };

    service.getFrontendSettings = function () {
      return this.getAppData().frontendSettings;
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

    service.getPathDataEntry = function (idx) {
      return this.getAppData().pathData.entryList[idx];
    };

    service.getPathDataEntrySize = function (idx) {
      return this.getAppData().pathData.entryList.length;
    };

    service.storeImageMeta = function (name, imageMeta) {
      if (this.getAppData().pathData.metaMap == null) {
        this.getAppData().pathData.metaMap = {};
      }
      this.getAppData().pathData.metaMap[name] = imageMeta;
    };

    service.getMetaInfo = function (name) {
      if (this.getAppData().pathData.metaMap != null) {
        return this.getAppData().pathData.metaMap[name];
      } else {
        return null;
      }
    };

    service.setAppMode = function (mode) {
      this.getAppData().appModeStack = [mode];
    };

    service.getAppMode = function () {
      return this.getAppData().appModeStack[this.getAppData().appModeStack.length - 1];
    };

    service.pushAppMode = function (mode) {
      this.getAppData().appModeStack.push(mode);
    };

    service.popAppMode = function () {
      return this.getAppData().appModeStack.pop();
    };

    service.getAppModeStack = function () {
      return this.getAppData().appModeStack;
    };

    service.useExternalVideoPlayer = function () {
      return this.getAppData().useExternalVideoPlayer;
    };

    service.setSelectedIndex = function (index) {
      this.getAppData().pathDataSelectedIndex = index;
    };

    service.getSelectedIndex = function () {
      return this.getAppData().pathDataSelectedIndex;
    };

    return service;
  };
})();
