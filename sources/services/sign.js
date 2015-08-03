(function() {
  'use strict';

  angular
    .module('app')
    .factory('SignService', ['$http', function($http) {
      var service = {};

      service.signup = function SignService_create(user, callback) {
        $http.post('/api/signup', user).then(function(response) {
          if (callback) {
            callback(response.data);
          }
        });
      };

      service.signin = function SignService_create(user, callback) {
        $http.post('/api/signin', user).then(function(response) {
          if (callback) {
            callback(response.data);
          }
        });
      };

      return service;
    }]);

})();