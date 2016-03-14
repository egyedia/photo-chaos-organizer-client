(function () {
  'use strict';

  angular
      .module('pcoApp')
      .service('RestCallBuilder', RestCallBuilder);

  RestCallBuilder.$inject = ['$http', 'DataService'];

  function RestCallBuilder($http, DataService) {

    var service = {};

    service.method = function (method, url, data) {
      var req = {
        "method" : method,
        "url"    : url,
        "data"   : data,
        "headers": {
          "Authorization": "pco " + DataService.getUserId()
        }
      };
      return $http(req);
    };

    service.get = function (url) {
      return this.method("GET", url, null);
    };

    service.delete = function (url) {
      return this.method("DELETE", url, null);
    };

    service.post = function (url, data) {
      return this.method("POST", url, data);
    };

    service.put = function (url, data) {
      return this.method("PUT", url, data);
    };

    return service;
  };
})();
