(function() {
  'use strict';

  var app = angular.module('app');

  app.controller('SignController', [
    '$location', 'SignService',
    function($location, SignService) {
      var that = this;

      (function initController() {
        // reset login status
        SignService.logout();
      })();


      this.isRegistering = false;

      this.reset = function SignController_reset() {
        this.errorMessage = '';
        that.signInInfo = {
          id: '',
          password: ''
        };

        that.signUpInfo = {
          username: '',
          email: '',
          password: ''
        };
      };

      /**
       * Display the signin or the signup form
       */
      this.switchForm = function SignController_switchForm() {
        var formsElement = document.querySelector('#buf-sign__forms');

        this.isRegistering = !this.isRegistering;

        if (this.isRegistering) {
          formsElement.classList.add('registering');
        } else {
          formsElement.classList.remove('registering');
        }

        this.errorMessage = '';
      };

      this.signIn = function SignController_signIn(valid) {
        if (valid) {
          SignService.signin(this.signInInfo, function(data) {
            if (data.status === 'error') {
              that.errorMessage = data.statusMessage;
            } else {
              that.reset();

              $location.path("/");
            }
          });
        }
      };

      this.signUp = function SignController_signUp(valid) {
        if (valid) {
          SignService.signup(this.signUpInfo, function(data) {
            if (data.status === 'error') {
              that.errorMessage = data.statusMessage;
            } else {
              that.reset();
            }
          });
        }
      };

      this.reset();
    }
  ]);
})();