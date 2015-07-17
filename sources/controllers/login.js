(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', [
      '$location', 'ConnectService',
      function($location, ConnectService) {
        (function init() {
          // Log out on init
          ConnectService.logout();
        })();

        this.login = function() {
          ConnectService.login(this.name, this.password, function(response) {
            if (response.success) {
              $location.path('/');
            } else {
              // display error
            }
          });
        };
      }
    ]);
})();