'use strict';

    angular
    .module('utubelike')
    .factory('settings', ['$http', '$state',
    function ($http, $state) {

        var settingServiceFactory = {};

        var _googleApiKey = function(){
            return 'AIzaSyDS1IIH7jM31pxrZXT3Lo0SMEcyuFZBBbQ';
        }

        var _baseUrl = function(){
            return 'https://www.googleapis.com/youtube/v3/';
        }

        settingServiceFactory.googleApiKey = _googleApiKey;
        settingServiceFactory.baseUrl = _baseUrl;

        return settingServiceFactory;
    }]);