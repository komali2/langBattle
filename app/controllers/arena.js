angular.module('langBattle')
  .controller('arenaController',
    ['$scope', '$http', 'materialFactory', 'battleFactory',
    function($scope, $http, materialFactory, battleFactory){
      $scope.native = 'english';
      $scope.foreign = 'chinese';

      $scope.joinBattle = function(){
        materialFactory.openModal('#battleView');
        battleFactory.joinBattle();
      }
    }]);
