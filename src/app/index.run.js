(function() {
    'use strict';

    angular
        .module('utubelike')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log) {

        $log.debug('runBlock end');
    }

})();