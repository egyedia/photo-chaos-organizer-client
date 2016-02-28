'use strict';

var angularRun = function (DataService) {

  DataService.initialize();
};

angularRun.$inject = ['DataService'];
angularApp.run(angularRun);
