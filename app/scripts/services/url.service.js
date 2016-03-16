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

    service.usersId = function (id) {
      return this.users() + '/' + id;
    };

    service.taskCopyToDatedFolder = function () {
      return baseUrl + 'tasks/copy-to-dated-folder';
    }

    service.filesystemRaw = function () {
      return baseUrl + 'filesystem-raw';
    };

    service.filesystemRawId = function (path) {
      return this.filesystemRaw() + '/file://' + path;
    }

    return service;

  };
})();