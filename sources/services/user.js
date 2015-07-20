(function() {
  'use strict';

  angular
    .module('app')
    .factory('UserService', ['$http', function($http) {
      var service = {};

      service.create = function UserService_create(user) {
        return $http.post('/api/users', user, function(data) {
          console.log(data);
        });
      };

      return service;
    }]);

})();