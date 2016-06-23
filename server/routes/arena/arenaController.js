var ioController = require('./ioController.js');
var cardController = require('./cardController.js');
var storage = require('./storage.js');


function User(id){
  this.id = id;
  this.cardIndex = 0;
  this.inBattle = false;
  this.roomNumber = null;
  this.hasPartner = false;
  this.isReady = false;
  this.cardArray = [];
  this.partner = {};
}

module.exports = {


  ioConnect: function (socket){
    //socket.on('joinBattle', ioController.handleNewPlayer);
    console.log('enter player: ', socket.id);
    socket.on('joinBattle', ()=>{
      ioController.handleNewPlayer(socket);

    });

    socket.on('getFirstCard', ()=>{
      var user = storage.userStorage[socket.id];

      if(user.inBattle){
        socket.emit('newCard', user.cardArray[0]);
        user.cardIndex++;
      }

    });

    socket.on('submitCard', (data)=>{
      var user = storage.userStorage[socket.id];
      if(user.inBattle){
        //if correct
        if(user.cardArray[user.cardIndex - 1].id === data.id){
          if(user.cardIndex < 10){
            socket
              .emit('newCard', user.cardArray[user.cardIndex]);
              user.cardIndex++;
          }
          else if(user.cardIndex >= 10){
            var battleRoom = 'battleRoom' + user.roomNumber;
            socket.emit('youWin', {'youWon':'youWon'});
            socket.broadcast.to(battleRoom).emit('youLose', {'youLost': 'youLost'});
          }
        }
        //if incorrect
        else{
          socket.emit('wrongCard', {});
        }
      }
    });



    socket.on('youLost', ()=>{

    });

    socket.on('startBattle', ()=>{
      var user = storage.userStorage[socket.id];
      var battleRoom = 'battleRoom' + user.roomNumber;
      var counter = 0;
      user.isReady = true;
      for(var i = 0; i < storage.roomStorage[user.roomNumber].length; i++){
        if(storage.roomStorage[user.roomNumber][i].isReady){
          counter++;
        }
      }
      if(counter === 1){
        socket.broadcast.to(battleRoom).emit('partnerStarted', {});
      }
      else if(counter === 2){
        cardController.getCardArray(function(cardArray){
          user.cardArray = cardArray;
          user.partner.cardArray = cardArray;
          socket.broadcast.to(battleRoom).emit('okToStart', {});
          socket.emit('okToStart', {});
        });

      }
    })

  },

}
