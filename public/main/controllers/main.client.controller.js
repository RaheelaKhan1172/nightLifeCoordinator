angular.module('main').controller('ApiController', ['$scope', 'Search',
  function($scope,Search) {
      $scope.result = [];
      $scope.search = function() {
          var search = new Search({
             zip: this.zip 
          });
          
          search.$save(function(response) {
              console.log('yelloooo', response)
                  console.log('hi')
                  $scope.result = response.data.map(function(a) {
                      return {
                          "title": a.title,
                          "description": a.description,
                          "votes": a.votes.count,
                          "image": a.image,
                          "url":a.url
                      }
                  });
              
              console.log($scope.result);
          }, function(errorResponse) {
             $scope.error = errorResponse.data.message; 
          });
          
      }
      
  }]);