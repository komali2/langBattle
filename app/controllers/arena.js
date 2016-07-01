angular.module('langBattle')
  .controller('arenaController',
    ['$scope', '$http', 'materialFactory', 'battleFactory',
    function($scope, $http, materialFactory, battleFactory){
      $scope.native = 'english';
      $scope.foreign = 'chinese';

      $scope.joinBattle = function(type){
        materialFactory.openModal('#battleView');
        battleFactory.joinBattle(type, $scope.native, $scope.foreign);
      }
    }]);
