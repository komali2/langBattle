angular.module('langBattle')
  .controller('battleController',
  ['$scope', 'socket', '$http',
  function($scope, socket, $http){
    $scope.closeModal = function(){
       $('#modal1').closeModal();
    }




  }]);
