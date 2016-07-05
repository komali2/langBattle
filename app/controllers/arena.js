angular.module('langBattle')
  .controller('arenaController',
    ['$scope', '$http', 'materialFactory', 'battleFactory',
    function($scope, $http, materialFactory, battleFactory){
      $scope.native = 'english';
      $scope.foreign = 'chinese';

      $scope.joinBattle = function(mode){
        materialFactory.openModal('#battleView');
        battleFactory.joinBattle($scope.native, $scope.foreign, mode);
      }

      $scope.setNative = function(lang){
        $scope.native = lang;
      }

      $scope.setForeign = function(lang){
        $scope.foreign = lang;
      }

    }]);
