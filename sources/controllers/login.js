(function() {
  'use strict';

  var app = angular.module('app');

  app.controller('LoginController', ['$location', 'ConnectService', function($location, ConnectService) {
    (function init() {
      // Log out on init
      ConnectService.logout();
    })();

    this.login = function() {
      ConnectService.login(this.username, this.password, function(response) {
        if (response.success) {
          $location.path('/');
        } else {
          // display error
        }
      });
    };
  }]);
})();