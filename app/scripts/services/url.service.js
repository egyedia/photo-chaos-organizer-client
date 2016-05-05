(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('UrlService', UrlService);

  UrlService.$inject = ['$http', '$location'];

  function UrlService($http, $location) {

    var restPort = $location.port();
    // GULP-hack //
    //restPort = 2120;

    var baseUrl = 'http://localhost:' + restPort + '/';
    var service = {};

    service.filesystemFavorites = function () {
      return baseUrl + 'filesystem-favorites';
    };

    service.filesystemFavoritesId = function (id) {
      return this.filesystemFavorites() + '/' + id;
    };

    service.filesystemPathContents = function () {
      return baseUrl + 'filesystem-path-contents';
    };

    service.filesystemPathContentsId = function (path) {
      return this.filesystemPathContents() + '/' + path;
    };

    service.filesystemRoots = function () {
      return baseUrl + 'filesystem-roots';
    };

    service.filesystemMetaThumbnailData = function () {
      return baseUrl + 'filesystem-meta-thumbnail-data';
    };

    service.filesystemMetaThumbnailDataId = function (path) {
      return this.filesystemMetaThumbnailData() + '/file://' + path;
    };

    service.filesystemOnTheFlyThumbnailData = function () {
      return baseUrl + 'filesystem-onthefly-thumbnail-data';
    };

    service.filesystemOnTheFlyThumbnailDataId = function (path) {
      return this.filesystemOnTheFlyThumbnailData() + '/file://' + path + "?width=200&height=200";
    };

    service.filesystemMetaThumbnailMeta = function () {
      return baseUrl + 'filesystem-meta-thumbnail-meta';
    };

    service.filesystemMetaThumbnailMetaId = function (path) {
      return this.filesystemMetaThumbnailMeta() + '/file://' + path;
    };

    service.users = function () {
      return baseUrl + 'users';
    };

    service.usersId = function (id) {
      return this.users() + '/' + id;
    };

    service.filesystemRaw = function () {
      return baseUrl + 'filesystem-raw';
    };

    service.filesystemRawId = function (path) {
      return this.filesystemRaw() + '/file://' + path;
    };

    service.taskTemplates = function () {
      return baseUrl + 'task-templates';
    };

    service.taskTemplateClassName = function (className) {
      return this.taskTemplates() + '/' + className;
    };

    service.tasks = function () {
      return baseUrl + 'tasks';
    };

    service.taskStatus = function () {
      return baseUrl + 'task-status';
    };

    service.taskId = function (taskId) {
      return this.tasks() + '/' + taskId;
    };

    service.previewTask = function (taskId) {
      return this.tasks() + '/' + taskId + '?action=preview';
    };

    service.loadTaskStatus = function (taskId) {
      return this.taskStatus() + '/' + taskId;
    };

    service.runTask = function (taskId) {
      return this.tasks() + '/' + taskId + '?action=run';
    };

    service.deleteTask = function (taskId) {
      return this.tasks() + '/' + taskId ;
    };

    service.shutdownServer = function (taskId) {
      return baseUrl + 'app-control-shutdown';
    };

    service.externalVideo = function (path) {
      return baseUrl + 'app-control-play-video' + '/file://' + path;
    };

    service.filesystemPath = function (path) {
      return baseUrl + 'filesystem-path';
    };

    service.filesystemPathId = function (path) {
      return this.filesystemPath() + '/file://' + path;
    };

    service.filesystemRange = function (path) {
      return baseUrl + 'filesystem-range' + '/file://' + path;
    };

    return service;

  };
})();