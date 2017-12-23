(function() {
    'use strict';

    angular
        .module('utubelike')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('search', {
                url: '/search?query',
                templateUrl: 'app/main/main.html',
                controller: 'MainController',
                controllerAs: 'ctrl'
            })
            .state('channel', {
                url: '/channel/:channelId',
                templateUrl: 'app/channel/channel.html',
                controller: 'ChannelController',
                controllerAs: 'ctrl'
            })
            .state('video', {
                url: '/video/:videoId',
                templateUrl: 'app/video/video.html',
                controller: 'VideoController',
                controllerAs: 'ctrl'
            });

        $urlRouterProvider.otherwise('/search?query=vodafone');
    }

})();