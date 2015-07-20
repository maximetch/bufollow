(function() {
  'use strict';

  var app = angular.module('app');

  app.controller('LoginController', ['$location', 'ConnectService', 'UserService', function($location, ConnectService, UserService) {
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

    this.register = function() {
      UserService.create({
        name: this.username,
        email: this.email
      });
    };
  }]);
})();