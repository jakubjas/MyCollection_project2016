angular.module('myCollectionApp.services', []).factory('Record', function($resource) {

   return $resource('http://localhost:8000/api/records/:id', { id: '@_id' }, {

       update: {
           method: 'PUT'
       }

   });

}).service('popupService',function($window) {

    this.showPopup = function(message) {
        return $window.confirm(message);
    }

});