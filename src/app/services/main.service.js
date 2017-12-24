'use strict';

    angular
    .module('utubelike')
    .factory('MainService', ['$http', '$state','settings',
    function ($http, $state,settings) {

        var mainServiceFactory = {};
        var serviceBase = settings.baseUrl();

        var _searchResults = function (query, number, Ptoken) {
            return $http.get(serviceBase + 'search', {
                params: {
                    "q": query,
                    "maxResults": number,
                    "pageToken": Ptoken,
                    "part": 'snippet',
                    "key" : settings.googleApiKey()
                }
            });
        };

        var _videoRelated = function (video_id) {
            return $http.get(serviceBase + 'search', {
                params: {
                    "type": 'video',
                    "relatedToVideoId": video_id,
                    "part": 'snippet',
                    "key" : settings.googleApiKey()
                }
            });
        };

        var _channelPlaylist = function (channel_id, number) {
            return $http.get(serviceBase + 'playlists', {
                params: {
                    "channelId": channel_id,
                    "maxResults": number,
                    "part": 'snippet,contentDetails',
                    "key" : settings.googleApiKey()
                }
            });
        };

        var _cannelSections = function (channel_id) {
            return $http.get(serviceBase + 'channelSections', {
                params: {
                    "channelId": channel_id,
                    "part": 'snippet,contentDetails',
                    "key" : settings.googleApiKey()
                }
            });
        };

        var _playlistVideos = function (playlisy_id, number) {
            return $http.get(serviceBase + 'playlistItems', {
                params: {
                    "playlistId": playlisy_id,
                    "maxResults": number,
                    "part": 'snippet,contentDetails',
                    "key" : settings.googleApiKey()
                }
            });
        };

        var _videoDetails = function (id) {
            return $http.get(serviceBase + 'videos', {
                params: {
                    "id": id,
                    "part": 'snippet,contentDetails',
                    "key" : settings.googleApiKey()
                }
            });
        };

        var _channelDetails = function (id) {
            return $http.get(serviceBase + 'channels', {
                params: {
                    "id": id,
                    "part": 'snippet,contentDetails',
                    "key" : settings.googleApiKey()
                }
            });
        };


        /*used*/
        mainServiceFactory.searchResults = _searchResults;
        /*used*/
        mainServiceFactory.videoRelated = _videoRelated;
        /*used*/
        mainServiceFactory.channelPlaylist = _channelPlaylist;
        mainServiceFactory.cannelSections = _cannelSections;
        /*used*/
        mainServiceFactory.playlistVideos = _playlistVideos;
        /*used*/
        mainServiceFactory.videoDetails = _videoDetails;
        /*used*/
        mainServiceFactory.channelDetails = _channelDetails;

        return mainServiceFactory;
    }]);