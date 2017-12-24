(function() {
    'use strict';

    angular
        .module('utubelike')
        .controller('ChannelController', ChannelController);

    /** @ngInject */
    function ChannelController(MainService, $stateParams, $state, $scope, ngProgressFactory) {
    	var vm = this;
    	vm.channelId = $stateParams.channelId;
    	vm.number = 25;

    	vm.getChannelById = function(){
    		// $scope.progressbar.start();
    		MainService.channelDetails(vm.channelId).then(
    			function (response) {
    				vm.item_data = response.data.items[0];
    			});

    		/*Cannot find a reason for this API*/
    		// MainService.cannelSections(vm.channelId).then(
    		// 	function (response) {
    		// 		console.log(response.data);
    		// 	});

    		MainService.channelPlaylist(vm.channelId, vm.number).then(
    			function (response) {
    				vm.channelplaylist = response.data.items;
    			});
    	}

    	$scope.searchSubmit = function(query){
    		$state.go('search', {query: query});
    	}

    	$scope.showSearchMobile = function(mobile, query){
    		if(!mobile)
    			$state.go('search', {query: query});
    	}

    	vm.getChannelById();
    }
})();