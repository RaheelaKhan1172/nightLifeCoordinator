angular.module('main').controller('ApiController', ['$scope', 'Search', 'Authentication', 
  function($scope,Search, Authentication) {
      
      $scope.authentication = Authentication;
      $scope.result = [];
      
      
      
          $scope.checkIfVoted = function(target) {
            console.log('the target', target,$scope.authentication.user._id);
              console.log('whats happenenin', $scope.voted);
            if ($scope.authentication.user._id == target) {
                console.log('i Happened',$scope.voted)
                $scope.here = target;
            }
          };
            
          $scope.update = function(btnId) {
          console.log('in here');
              
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
              console.log($scope.result);
          },function(err) {
            $scope.error = errorResponse.data.message;
          });
          
      };
      
     /* $scope.rows = function() {
          
          console.log('hello');
         var html = "<div class='row'>";
        
          for (var i = 0; i < $scope.result.length; i++) {
            html += "<div class='col-md-4  data'>";
            html += "<a href='"+$scope.result[i].url+"'>";
            html += ($scope.result[i].image) ? "<img class='img-responsive text-center' src='"+$scope.result[i].image+"'></img>" : "<img class='img-responsive placeholder text-center' src='img/image.jpg'></img>";
            html += "</a>"
            html += "<div class='row second'>";
            html += "<div class='col-xs-6'>";
            if ($scope.authentication.user) {
                html += "<button type='button' class='btn btn-default' data-ng-click='update()'>I'm going!</button>";
                html += "</div>"
            } else {
                html += "<a href='/oauth/facebook'> Sign in to let friends know you're going!</a>";
                html += "</div>"
            }
            html += "<div class='col-xs-4'>";
            html += "<span class='text'>Total going:" + $scope.result[i].votes.count + "</span>";
            html += "</div></div>";  
            html += "<a href='" + $scope.result[i].url+"'>";
            html += "<h3>"+$scope.result[i].title+"</h3></a>";
            html += "<p>"+ $scope.result[i].description+"</p></div>";
            
            if ((i+1) % 3 === 0) {
                html += "</div><div class='row'>";
            }
          }
           var elem = angular.element(document.querySelector("#main"));
           elem.html(html)
      }; */
      
      
      $scope.search = function() {
          
          
          var search = new Search({
             zip: this.zip 
          });
          
          search.$save(function(response) {
                console.log(response)
              if (response.data.length) {
              $scope.zipCode = response.data[0].zip;
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
                  console.log(response);
              } else {
                    
              }
              
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