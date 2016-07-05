angular.module('langBattle')
  .controller('battleController',
  ['$scope', 'socket', '$http', 'materialFactory', 'cardFactory', 'battleFactory',
  function($scope, socket, $http, materialFactory, cardFactory, battleFactory){
    $scope.battleStatus = 'Waiting for Partner...';
    $scope.currCard = {};
    $scope.gameMessage = 'You will see a word, choose the correct translation! Finish all the words before your partner does.';
    $scope.hasPartner = false;
    $scope.waiting = true;
    $scope.battleOngoing = false;
    $scope.question = '';

    $scope.exitBattle = function(){
      materialFactory.closeModal('#battleView');
    }


    $scope.submitCard = function(i){
      cardFactory.submitCard(i);
    }

    $scope.getFirstCard = function(){
      cardFactory.getFirstCard();
      $scope.battleStarted = true;
      $scope.battleStatus = 'In Battle!'
      $scope.battleOngoing = true;
    }

    $scope.startBattle = function(){
      $scope.waiting = true;
      $scope.battleStatus = 'Waiting for partner to start...'
      battleFactory.startBattle();
    }

    $scope.$on('battle:okToStart', (data)=>{
      $scope.getFirstCard();
      $scope.waiting = false;
      $scope.gameMessage = '';
    });

    $scope.$on('battle:partnerStarted', (data)=>{
      $scope.gameMessage = 'Your Partner is Waiting!'
    });

    $scope.$on('card:newCard', function(event, data){
      $scope.currCard = data;
      $scope.question = data[$scope.native];
      $scope.gameMessage = '';
    });


    $scope.$on('card:wrongCard', (event, data)=>{
      $scope.gameMessage='Wrong Card!';
    });

    $scope.$on('battle:youWin', (data)=>{
      var message = "You Win";
      if(data.youCorrect){
        message += ' You: ' + data.youCorrect + '. ';
        message += 'Your partner: ' + data.partnerCorrect + '.';
      }

      $scope.gameMessage = message;
      $scope.battleOngoing = false;
    });

    $scope.$on('battle:youLose', (data)=>{
      var message = "You Lose";
      if(data.youCorrect){
        message += ' You: ' + data.youCorrect + '. ';
        message += 'Your partner: ' + data.partnerCorrect + '.';
      }

      $scope.gameMessage = message;
      $scope.battleOngoing = false;

    });

    $scope.$on('battle:hasPartner', (data)=>{
      $scope.hasPartner = true;
      $scope.battleStatus = 'Press Start...';
      $('#startBattle').removeClass('disabled');
    });



  }])
    .directive('battleDirective', function(){
      return {

        templateUrl: '../views/arena.html',
        controller: 'battleController'
      }
    });
