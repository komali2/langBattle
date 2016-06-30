angular.module('langBattle')
  .factory('cardFactory', function($http, socket, $rootScope){
    var objOut = {};
    var cardArray = [];

    objOut.submitCard = function(i){
      var id = cardArray[i].id;
      socket.emit('submitCard', {id: id});
    }

    socket.on('newCard', (data)=>{
      console.log(data);
      cardArray = data.choiceArray;
      $rootScope.$broadcast('card:newCard', data);
    });

    socket.on('wrongCard', (data)=>{
      $rootScope.$broadcast('card:wrongCard', data);
    });

    

    return objOut;
  });
