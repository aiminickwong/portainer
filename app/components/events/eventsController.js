angular.module('events', [])
.controller('EventsController', ['$scope', 'Notifications', 'Events', 'Pagination',
function ($scope, Notifications, Events, Pagination) {
  $scope.state = {};
  $scope.state.pagination_count = Pagination.getPaginationCount('events');
  $scope.sortType = 'Time';
  $scope.sortReverse = true;

  $scope.order = function(sortType) {
    $scope.sortReverse = ($scope.sortType === sortType) ? !$scope.sortReverse : false;
    $scope.sortType = sortType;
  };

  $scope.changePaginationCount = function() {
    Pagination.setPaginationCount('events', $scope.state.pagination_count);
  };

  var from = moment().subtract(24, 'hour').unix();
  var to = moment().unix();

  Events.query({since: from, until: to},
  function(d) {
    $scope.events = d.map(function (item) {
      return new EventViewModel(item);
    });
    $('#loadEventsSpinner').hide();
  },
  function (e) {
    $('#loadEventsSpinner').hide();
    Notifications.error("Failure", e, "Unable to load events");
  });
}]);
