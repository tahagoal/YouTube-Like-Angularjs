(function() {
    'use strict';

    angular
        .module('utubelike')
        .directive('acmeNavbar', acmeNavbar);

    /** @ngInject */
    function acmeNavbar() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/navbar/navbar.html',
            scope: {
                search: '&',
                show: '&'
            },
            controller: NavbarController,
            controllerAs: 'ctrl'
        };

        return directive;

        /** @ngInject */
        function NavbarController($scope) {
            var vm = this;
            vm.show_search_mobile = false;

            vm.showSearchMobile = function(){
                vm.show_search_mobile = !vm.show_search_mobile;
            }
        }
    }

})();