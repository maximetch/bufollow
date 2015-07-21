(function() {
  'use strict';

  var app = angular.module('app');

  app.controller('LoginController', [
    '$location', 'ConnectService', 'UserService',
    function($location, ConnectService, UserService) {
      this.init = function LoginController_init() {
        this.loginInfo = {
          username: '',
          password: ''
        };

        this.registerInfo = {
          username: '',
          email: '',
          password: ''
        };
      };

      this.login = function LoginController_login(valid) {
        if (valid) {
          ConnectService.login(this.username, this.password, function(response) {
            if (response.success) {
              $location.path('/');
            } else {
              // display error
            }
          });
        }
      };

      this.register = function LoginController_register(valid) {
        if (valid) {
          this.registerInfo.dateCreate = Date.now();
          UserService.create(this.registerInfo);

          this.init();
        }
      };
    }
  ]);
})();