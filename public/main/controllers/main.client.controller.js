angular.module('main').controller('ApiController', ['$scope', 'Search', 'Authentication', 
  function($scope,Search, Authentication) {
      
      $scope.authentication = Authentication;
      $scope.result = [];
      console.log($scope.authentication)
      
      
      
      $scope.update = function(btnId) {
          
          var toSend = {
              user: $scope.authentication.user._id,
              choice: btnId
          };
          var search = new Search(toSend);
          console.log(toSend,search)
          search.$update(function(response) {
            $scope.result = response.data.map(function(a) {
                return {
                    "title": a.title,
                    "description": a.description,
                    "votes": a.votes,
                    "image": a.image,
                    "url": a.url
                }
            });
              
          },function(err) {
            $scope.error = errorResponse.data.message;
          });
          
      };
      
      $scope.search = function() {

          var search = new Search({
             zip: this.zip 
          });
          
          search.$save(function(response) {
    
              $scope.zipCode = response.data[0].zip;
              console.log($scope.zipCode,response.data[0].zip,response.data[0])
                  $scope.result = response.data.map(function(a) {
                      return {
                          "title": a.title,
                          "description": a.description,
                          "votes": a.votes,
                          "image": a.image,
                          "url":a.url,
                          "zip":a.zip
                      }
                      
                  });
          
          }, function(errorResponse) {
             $scope.error = errorResponse.data.message; 
          });
          
      };
      
      var init = function() {
          if ($scope.authentication.user) {
              $scope.search();
          };
      }
      
      init();
  }]);