angular.module('myCollectionApp.controllers', []).controller('RecordListController', function($scope, $state, popupService, $window, Record) {

    $scope.records = Record.query(); // fetch all records. Issues a GET to /api/records

    $scope.deleteRecord = function(record) { // Delete a record. Issues a DELETE to /api/records/:id

        if (popupService.showPopup('Na pewno usunąć?')) {

            record.$delete(function() {
                $window.location.href = ''; // redirect to home
            });

        }

    };

}).controller('RecordViewController', function($scope, $stateParams, Record) {

    $scope.record = Record.get({ id: $stateParams.id }); // Get a single record. Issues a GET to /api/records/:id

}).controller('RecordCreateController', ['$scope', '$state', '$stateParams', 'Record', 'Upload', function($scope, $state, $stateParams, Record, Upload) {

    $scope.uiRouterState = $state;

    $scope.tracks = [{number: 1}];

    // dynamically created fields
    $scope.addNewTrack = function() {

        var newItemNo = $scope.tracks.length+1;
        $scope.tracks.push({'number': newItemNo});

    };

    $scope.removeTrack = function() {

        var lastItem = $scope.tracks.length-1;
        $scope.tracks.splice(lastItem);

    };

    $scope.cleanLastTrack = function() {

        if ($scope.tracks.length != 0) {
            if ($scope.tracks[$scope.tracks.length-1].name == null) {
                $scope.tracks.pop();
            }
        }

    };

    $scope.record = new Record();  // create new record instance. Properties will be set via ng-model in the UI

    $scope.addCover = function (callback) {

        var file = $scope.record.file;

        if (!file) {
            return;
        }

        Upload.upload({
            url: '/api/upload/',
            file: file
        })
        .success(function(data, status, headers, config) {
            console.log('file ' + config.file.name + ' uploaded. Response: ' + data);
            callback(data.filename);
        })
        .error(function(data, status, headers, config) {
            $scope.uploadOK = false;
            console.log('Error: ' + status);
        });
    };

    $scope.addRecord = function() { // create a new record. Issues a POST to /api/records

        $scope.cleanLastTrack();

        $scope.addCover(function(filename) {

            $scope.record["cover_art"] = filename;
            $scope.record["tracklist"] = $scope.tracks;

            $scope.record.$save(function() {
                $state.go('records'); // on success go back to home i.e. records state.
            });

        });

    };

}]).controller('RecordEditController', ['$scope', '$state', '$stateParams', 'Record', 'Upload', function($scope, $state, $stateParams, Record, Upload) {

    // dynamically created fields
    $scope.addNewTrack = function() {

        var newItemNo = $scope.tracks.length+1;
        $scope.tracks.push({'number': newItemNo});

    };

    $scope.removeTrack = function() {

        var lastItem = $scope.tracks.length-1;
        $scope.tracks.splice(lastItem);

    };

    $scope.cleanLastTrack = function() {

        if ($scope.tracks.length != 0) {
            if ($scope.tracks[$scope.tracks.length-1].name == null) {
                $scope.tracks.pop();
            }
        }

    };

    $scope.addCover = function (callback) {

        var file = $scope.record.file;

        if (!file) {
            return;
        }

        Upload.upload({
            url: '/api/upload/',
            file: file
        })
        .success(function(data, status, headers, config) {
            console.log('file ' + config.file.name + ' uploaded. Response: ' + data);
            callback(data.filename);
        })
        .error(function(data, status, headers, config) {
            $scope.uploadOK = false;
            console.log('Error: ' + status);
        });
    };

    $scope.updateRecord = function() { // Update the edited record. Issues a PUT to /api/records/:id

        $scope.cleanLastTrack();

        if ($scope.record.file != null) {

            $scope.addCover(function(filename) {

                $scope.record["cover_art"] = filename;
                $scope.record["tracklist"] = $scope.tracks;

                $scope.record.$update(function() {
                    $state.go('records'); // on success go back to home i.e. records state.
                });

            });
        }
        else {
            $scope.record["tracklist"] = $scope.tracks;

            $scope.record.$update(function() {
                $state.go('records'); // on success go back to home i.e. records state.
            });
        }

    };

    $scope.loadRecord = function() { // Issues a GET request to /api/records/:id to get a record to update
        Record.get({ id: $stateParams.id }).$promise.then(function(data) {
            $scope.record = data;
            $scope.tracks = data.tracklist;
        });
    };

    $scope.loadRecord(); // Load a record which can be edited in the UI

}]);
