(function() {
    'use strict';

    angular
        .module('utubelike')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController(MainService, $stateParams, $state, $scope, ngProgressFactory) {
    	var vm = this;

    	$scope.progressbar = ngProgressFactory.createInstance();
    	vm.query = $stateParams.query;
    	vm.show_filters = false;
		vm.show_loading = false;
		vm.filter_loading = false;
		vm.upload_variable = '';
		vm.type_variable = '';
		vm.sort_variable = 're';
		vm.search_result = [];
		vm.counter = 0;
		vm.show_search_mobile = false;
		vm.number = 25;

		vm.toggleFilter = function(){
			vm.show_filters = !vm.show_filters;
		}

		$(window).scroll(function() {
		   if($(window).scrollTop() + $(window).height() == $(document).height()) {
		   		vm.getMoreResults();
		   }
		});

		vm.getMoreResults = function(){
    		$scope.progressbar.start();
    		MainService.searchResults(vm.query, vm.number, vm.nextPageToken).then(
    			function (response) {
    				var items = response.data.items;
    				// vm.pageInfo = response.data.pageInfo;
    				vm.nextPageToken = response.data.nextPageToken;
					for (var i = items.length - 1; i >= 0; i--) {
						vm.items.push(items[i]);
					}
					$scope.progressbar.complete();
    			});
		}


    	vm.getSearchResults = function(){
    		$scope.progressbar.start();
			vm.filter_loading = true;
    		MainService.searchResults(vm.query, vm.number, '').then(
    			function (response) {
    				vm.items = response.data.items;
    				vm.pageInfo = response.data.pageInfo;
    				vm.nextPageToken = response.data.nextPageToken;
					vm.filter_loading = false;
					$scope.progressbar.complete();
    			});
    	}


    	$scope.searchSubmit = function(	query){
    		$state.go('search', {query: query});
    	}

    	$scope.showSearchMobile = function(mobile, query){
    		if(!mobile)
    			$state.go('search', {query: query});
    	}

    	vm.last_hour=[];
    	vm.today = [];
    	vm.week = [];
    	vm.month =[];
    	vm.videos = [];
    	vm.channels = [];
    	vm.playlists = [];

    	vm.type_filter = function(type_string){
    		$scope.progressbar.start();
    		if(vm.type_variable == type_string){
    			vm.type_variable = '';
    			vm.getSearchResults();
    			vm.show_filters = false;
    			$scope.progressbar.complete();
    			return;
    		}
    		vm.type_variable = type_string;
    		for (var i = vm.items.length - 1; i >= 0; i--) {
    			if(vm.items[i].id.kind == 'youtube#channel')
					vm.channels.push(vm.items[i]);
				else if(vm.items[i].id.kind == 'youtube#video')
					vm.videos.push(vm.items[i]);
				else if(vm.items[i].id.kind == 'youtube#playlist')
					vm.playlists.push(vm.items[i]);
    		}

    		if(vm.type_variable == 'vi')
				vm.items = vm.videos;
			else if(vm.type_variable == 'ch')
				vm.items = vm.channels;
			else if(vm.type_variable == 'pl')
				vm.items = vm.playlists;

    		vm.show_filters = false;
    		$scope.progressbar.complete();
    	}

    	vm.upload_filter = function(upload_string){
    		$scope.progressbar.start();
    		if(vm.upload_variable == upload_string){
    			vm.upload_variable = '';
    			vm.getSearchResults();
    			vm.show_filters = false;
    			$scope.progressbar.complete();
    			return;
    		}
    		vm.upload_variable = upload_string;
    		var now = new Date(); 
    		for (var i = vm.items.length - 1; i >= 0; i--) {
    			var date = new Date(vm.items[i].snippet.publishedAt);
    			var diff = Math.abs(now - date) / 36e5;
				if(diff < 1){
					vm.last_hour.push(vm.items[i]);
				}
				else if(diff < 24){
					vm.today.push(vm.items[i]);
				}
				else if(diff < 168){
					vm.week.push(vm.items[i]);
				}
				else if(diff < 730){
					vm.week.push(vm.items[i]);
				}
    		}

    		if(vm.upload_variable == 'lh')
				vm.items = vm.last_hour;
			else if(vm.upload_variable == 'to')
				vm.items = vm.today;
			else if(vm.upload_variable == 'we')
				vm.items = vm.week;
			else
				vm.items = vm.month;

    		vm.show_filters = false;
    		$scope.progressbar.complete();
    	}

    	vm.sort_filter = function(sort_string){
    		$scope.progressbar.start();
    		vm.sort_variable = sort_string;
    		if(vm.sort_variable == 'up')
    			vm.sort_word = 'snippet.publishedAt';
    		else
    			vm.sort_word = sort_string;
    		vm.show_filters = false;
    		$scope.progressbar.complete();
    	}

    	vm.getSearchResults();
    }
})();