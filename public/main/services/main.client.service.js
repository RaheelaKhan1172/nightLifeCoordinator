angular.module('main').factory('Search', ['$resource', function($resource) {
 return $resource('/:id', {
     id: '@_id'
 },{
    update: {
        method: 'PUT'
    } 
 });   
}]);