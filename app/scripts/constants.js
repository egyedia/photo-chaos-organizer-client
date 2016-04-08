(function () {
  'use strict';

  angular
      .module('pcoApp')
      .constant('CONST', {
        'appMode': {
          'NONE': null,
          'PATH': 'PATH',
          'PATH_RENAME': 'PATH_RENAME',
          'IMAGEVIEW': 'IMAGEVIEW'
        }
      });
})();