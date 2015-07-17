(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope'];
    function HomeController(UserService, $rootScope) {
        this.user = null;

        initController();

        function initController() {
          // Load user
        }

        function loadCurrentUser() {
        }
    }

})();