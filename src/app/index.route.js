(function() {
    'use strict';

    angular
        .module('utubelike')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainController as ctrl',
                controllerAs: 'main'
            });

        $urlRouterProvider.otherwise('/');
    }

})();