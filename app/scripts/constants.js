(function () {
  'use strict';

  angular
      .module('pcoApp')
      .constant('CONST', {
        'appMode': {
          'NONE': null,
          'PAGE': 'PAGE',
          'PATH': 'PATH',
          'PATH_RENAME': 'PATH_RENAME',
          'IMAGEVIEW': 'IMAGEVIEW',
          'IMAGEVIEW_FS': 'IMAGEVIEW_FS'
        }
      });
})();