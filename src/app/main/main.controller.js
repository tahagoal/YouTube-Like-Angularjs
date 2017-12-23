(function() {
    'use strict';

    angular
        .module('utubelike')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController(MainService) {
    	var vm = this;

    	vm.show_filters = false;
		vm.show_loading = false;
		vm.filter_loading = false;
		vm.upload_variable = '';
		vm.type_variable = '';
		vm.sort_variable = 're';
		vm.search_result = [];
		vm.counter = 0;

		vm.toggleFilter = function(){
			vm.show_filters = !vm.show_filters;
		}


    	vm.getSeatchResults = function(){
    		MainService.searchResults().then(
    			function (response) {
    				vm.items = response.data.items;
    				vm.pageInfo = response.data.pageInfo;
    			})

    	}

    	vm.getSeatchResults();
    }
})();