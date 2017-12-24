(function() {
    'use strict';

    angular
        .module('utubelike')
        .controller('VideoController', VideoController);

    /** @ngInject */
    function VideoController(MainService, $stateParams, $state, $scope, ngProgressFactory) {
    	var vm = this;

        vm.videoId = $stateParams.videoId;
        vm.number = 25;

        $scope.searchSubmit = function( query){
            $state.go('search', {query: query});
        }

        $scope.showSearchMobile = function(mobile, query){
            if(!mobile)
                $state.go('search', {query: query});
        }

        vm.getVideoById = function(){
            MainService.videoDetails(vm.videoId).then(
                function (response) {
                    vm.item_data = response.data.items[0];
                });

            MainService.videoRelated(vm.videoId, vm.number).then(
                function (response) {
                    vm.videolist = response.data.items;
                });
        }

        vm.getPlayListById = function(){
            MainService.playlistVideos(vm.videoId).then(
                function (response) {
                    vm.videolist = response.data.items;
                    vm.item_data = response.data.items[0];
                });
        }

        vm.playlist = ($stateParams.playlist == 'true');
        if(vm.playlist){
            vm.getPlayListById();
        }        
        else{
            vm.getVideoById();
        }

    }
})();