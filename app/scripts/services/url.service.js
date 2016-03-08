(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('UrlService', UrlService);

  UrlService.$inject = ['$http', 'base64'];

  function UrlService($http, base64) {

    var baseUrl = 'http://localhost:8080/';
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

    service.filesystemPathContentsId = function (encodedPath) {
      return this.filesystemPathContents() + '/' + encodedPath;
    };

    service.filesystemRoots = function () {
      return baseUrl + 'filesystem-roots';
    };

    service.filesystemMetaThumbnailData = function () {
      return baseUrl + 'filesystem-meta-thumbnail-data';
    };

    service.filesystemMetaThumbnailDataId = function (path) {
      return this.filesystemMetaThumbnailData() + '/' + path;
    };

    service.filesystemMetaThumbnailMeta = function () {
      return baseUrl + 'filesystem-meta-thumbnail-meta';
    };

    service.filesystemMetaThumbnailMetaId = function (path) {
      return this.filesystemMetaThumbnailMeta() + '/' + path;
    };

    service.users = function () {
      return baseUrl + 'users';
    };

    return service;

  };
})();