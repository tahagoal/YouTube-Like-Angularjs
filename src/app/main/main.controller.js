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
		   		vm.number = vm.number + 25;
		   		vm.getSeatchResults();
		   }
		});


    	vm.getSeatchResults = function(){
    		$scope.progressbar.start();
			vm.filter_loading = true;
    		MainService.searchResults(vm.query, vm.number).then(
    			function (response) {
    				vm.items = response.data.items;
    				vm.pageInfo = response.data.pageInfo;
					vm.filter_loading = false;
					$scope.progressbar.complete();
    			});
    	}

    	vm.searchSubmit = function(){
    		$state.go('search', {query: vm.query});
    	}

    	vm.showSearchMobile = function(){
    		if(vm.show_search_mobile)
    			$state.go('search', {query: vm.query});

    		vm.show_search_mobile = true;
    	}

    	vm.getSeatchResults();
    }
})();