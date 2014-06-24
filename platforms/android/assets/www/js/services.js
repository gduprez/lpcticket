angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})


.factory('Projects',function($http, $q){

  var projects = ['FETE A JOJO','NOVIP'];

  return {
    all: function(owner){
      //return projects;
      
      return $http.post('http://guillaumed.brinkster.net/api/GetprojectList/?owner=' + owner)
                  .then(function(response) {
                      if (typeof response.data === 'object') {
                          return response.data;
                      } else {
                          // invalid response
                          return $q.reject(response.data);
                      }

                  }, function(response) {
                      // something went wrong
                      return $q.reject(response.data);
                });

    },
    get: function(owner,pj){
      return $http.post('http://guillaumed.brinkster.net/api/Getproject/?owner=' + owner + '&pj=' + pj)
                  .then(function(response) {
                      if (typeof response.data === 'object') {
                          return response.data;
                      } else {
                          // invalid response
                          return $q.reject(response.data);
                      }

                  }, function(response) {
                      // something went wrong
                      return $q.reject(response.data);
                });
    }

  }
})
;


