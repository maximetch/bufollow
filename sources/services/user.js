(function() {
  'use strict';

  angular
    .module('app')
    .factory('UserService', ['$http', function($http) {
      var service = {};

      service.check = function UserService_check(user) {
        console.log(user)
        $http.get('/api/users', user, function(data) {

        });
      };

      service.create = function UserService_create(user, callback) {
        $http.post('/api/users', user).then(function(response) {
          if (callback) {
            callback(response.data);
          }
        });
      };

      return service;
    }]);

})();