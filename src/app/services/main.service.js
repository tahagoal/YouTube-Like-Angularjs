'use strict';

    angular
    .module('utubelike')
    .factory('MainService', ['$http', '$state','settings',
    function ($http, $state,settings) {

        var mainServiceFactory = {};
        var serviceBase = settings.baseUrl();

        var _searchResults = function () {
            return $http.get(serviceBase + 'search', {
                params: {
                    "q": 'vodafone',
                    "maxResults": 25,
                    "part": 'snippet',
                    "key" : settings.googleApiKey()
                }
            });
        };

        mainServiceFactory.searchResults = _searchResults;

        return mainServiceFactory;
    }]);