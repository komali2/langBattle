angular.module('langBattle')
  .controller('arenaController',
    ['$scope', 'socket', '$http',
    function($scope, socket, $http){
      
      $scope.showModal = function(){
        $('#modal1').openModal();
      }
    }]);
