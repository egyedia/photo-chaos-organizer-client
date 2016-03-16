(function () {
  'use strict';

  angular
      .module('pcoApp')
      .controller('PathController', PathController);

  PathController.$inject = ['$routeParams', 'FavoritesService', 'PathService', 'DataService', 'UsersService'];

  function PathController($routeParams, FavoritesService, PathService, DataService, UsersService) {
    var vm = this;

    var currentImage = null;

    UsersService.initialize();
    if (UsersService.redirectIfNeeded()) {
      return;
    }

    vm.renderingContentsFinished = function () {
      PathService.startLoadingThumbnails();
    };


    vm.getPathContents = function () {
      PathService.getPathContents($routeParams.path).then(function () {
        vm.pco = DataService.getAppData();
      });
    };

    vm.loadFavoritesAndPathContents = function () {
      FavoritesService.loadFavorites().then(function () {
        vm.getPathContents();
      });
    };

    vm.addOrRemoveFavorite = function (path, isFavorite) {
      if (!isFavorite) {
        FavoritesService.createFavorite(path).then(function () {
          vm.loadFavoritesAndPathContents();
        });
      } else {
        FavoritesService.removeFavoriteByPath(path).then(function () {
          vm.loadFavoritesAndPathContents();
        });
      }
    };

    vm.thumbClicked = function (entry, $index) {
      if (entry.fileType.fileType == 'image') {
        //console.log("open fancybox");
        //console.log(entry);
        this.openGallery(entry, $index);
      }
    };

    vm.openGallery = function (entry, $index) {
      var images = DataService.getCurrentRawList();
      var settings = {
        'padding'      : 0,
        'transitionIn' : 'none',
        'transitionOut': 'none',
        'changeFade'   : 0,
        'changeSpeed'  : 0,
        'index'        : $index,
        'type'         : 'inline'
      };

      var s = '';
      for (var i in images) {
        s += '<div class="pcoimage">';
        s += '<div class="imgcontainer"><img src="' + images[i].href + '" id="pcoImage' + i + '"/></div>';
        s += '<div class="title">' + images[i].title + '</div>';
        s += '</div>';
      }
      jq('#fancyImageGallery').html(s);
      // TODO generate inline html gallery from the returned data, taking into account the orientation

      var dw = jq(window).width();
      var dh = jq(window).height();
      var rotate = false;
      var fancyW = dw;
      var fancyH = dh;
      if (rotate) {
        fancyW = dh;
        fancyH = dw;
      }
      var maxW = fancyW - 50;
      var maxH = fancyH - 50;
      jq.fancybox.open(jq('.pcoimage').get(), {
        'type'          : 'inline',
        'width'         : fancyW,
        'height'        : fancyH,
        'overlayShow'   : true,
        'overlayOpacity': 0.7,
        'overlayColor'  : '#666',
        'showNavArrows' : true,
        'autoSize'      : true,
        'index'         : $index,
        'padding'       : 0,
        'margin'        : 20,
        'openSpeed'     : 250,
        'nextSpeed'     : 250,
        'prevSpeed'     : 250,
        'closeSpeed'    : 250,
        'afterLoad'     : function (upcoming, current) {
          currentImage = upcoming;
          var selector = '#pcoImage' + currentImage.index;
          var selector = '.pcoimage img';
          jq(selector).css("max-width", maxW).css("max-height", maxH);
          if (rotate) {
            jq(selector).addClass('bigRotateCW');
          }
        },
        'afterShow'     : function () {
          //jq.fancybox.update();
        }
      });
    };


    // make sure favorites are loaded
    // the load path contents
    if (FavoritesService.isInitialized()) {
      vm.getPathContents();
    } else {
      vm.loadFavoritesAndPathContents();
    }

  }
})();