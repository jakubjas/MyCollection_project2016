angular.module('myCollectionApp', ['ui.router', 'ngResource', 'myCollectionApp.controllers', 'myCollectionApp.services', 'ngFileUpload']);

angular.module('myCollectionApp').config(function($stateProvider) {

    $stateProvider.state('records', {

        // state for displaying all records
        url: '/records',
        templateUrl: 'partials/records.html',
        controller: 'RecordListController'

    }).state('viewRecord', {

        // state for displaying a single record
        url: '/records/:id/view',
        templateUrl: 'partials/record-view.html',
        controller: 'RecordViewController'

    }).state('newRecord', {

        // state for adding a new record
        url: '/records/new',
        templateUrl: 'partials/record-add.html',
        controller: 'RecordCreateController'

    }).state('editRecord', {

        url: '/records/:id/edit',
        templateUrl: 'partials/record-edit.html',
        controller: 'RecordEditController'

    });

}).run(function($state) {

    $state.go('records');

});