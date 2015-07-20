(function() {
  'use strict';

  angular
    .module('app')
    .factory('UserService', ['$http', function($http) {
      var service = {};

      service.check = function UserService_check(user) {
        $http.get('/api/users', user, function(data) {

        });
      };

      service.create = function UserService_create(user, callback) {
        $http.post('/api/users', user, function(result) {

          console.log(result)
          if (callback) {
            callback.apply();
          }
        });
      };

      return service;
    }]);

})();