var storage = require('./storage.js');
var cardController = require('./cardController.js');


function User(id, foreign, native, mode){
  this.id = id;
  this.cardIndex = 0;
  this.inBattle = false;
  this.roomNumber = null;
  this.hasPartner = false;
  this.isReady = false;
  this.cardArray = [];
  this.partner = {};
  this.foreign = foreign;
  this.native = native;
  this.mode = mode;
  this.numCorrect = 0;
  this.finished = false;
}


module.exports = {
  handleNewPlayer: function(socket, data, mode){
    //create new user
    storage.userStorage[socket.id] = new User(socket.id, data.foreign, data.native, data.mode);
    var user = storage.userStorage[socket.id];
    if(user.mode === 'accuracy'){
      user.numCorrect = 0;
    }
    //find a user without a partner
    for(var ele in storage.userStorage){
      var stored = storage.userStorage[ele];
      if(!stored.inBattle && stored.id !== user.id && stored.mode === user.mode){
        stored.inBattle = true;
        user.inBattle = true;
        user.roomNumber = stored.roomNumber;
        storage.roomStorage[user.roomNumber].push(user);
        storage.openRoom++;
        socket.broadcast.to('battleRoom' + stored.roomNumber).emit('hasPartner', {});
        socket.emit('hasPartner', {});
        user.partner = stored;
        stored.partner = user;
        break;
      }
    }
    //if no open users found, you are first. create new room
    if(!user.inBattle){
      user.roomNumber = storage.openRoom;
      storage.roomStorage[storage.openRoom] = [user];

    }

    var battleRoom = 'battleRoom' + user.roomNumber;
    //put user in the socket room
    socket.join(battleRoom, (err)=>{
      if(err){
        console.log(err);
      }
    });
  },

  getFirstCard: function(socket){
    var user = storage.userStorage[socket.id];

    if(user.inBattle){
      socket.emit('newCard', user.cardArray[0]);
      user.cardIndex++;
    }
  },

  submitCard: function(socket, data){
    var user = storage.userStorage[socket.id];
    if(user.inBattle){
      //if correct
      if(user.cardArray[user.cardIndex - 1].id === data.id){
        if(user.mode === 'timeTrial'){
          if(user.cardIndex < 10){
            socket
              .emit('newCard', user.cardArray[user.cardIndex]);
              user.cardIndex++;
          }
          else if(user.cardIndex >= 10){
            var battleRoom = 'battleRoom' + user.roomNumber;
            socket.emit('youWin', {'youWon':'youWon'});
            socket.broadcast.to(battleRoom).emit('youLose', {'youLost': 'youLost'});
            user.inBattle = false;
            user.partner.inBattle = false;
          }
        }
        else if(user.mode === 'accuracy'){
          //if this socket isn't done yet
          if(user.cardIndex < 10){
            socket
              .emit('newCard', user.cardArray[user.cardIndex]);
            user.numCorrect++;
          }
          //if this socket is done but their partner isn't
          else if(!user.partner.isFinished){
            socket.broadcast('partnerStarted');
          }
          //if this socket and their partner are finished
          else if(user.partner.isFinished){
            //if this socket won
            if(user.numCorrect > user.partner.numCorrect){
              socket.emit('youWin',
                {
                  youCorrect: user.numCorrect,
                  partnerCorrect: user.partner.numCorrect
                });
              socket.broadcast.to(battleRoom).emit('youLose',
              {
                youCorrect: user.numCorrect,
                partnerCorrect: user.partner.numCorrect
              });
              user.inBattle = false;
              user.partner.inBattle = false;
            }
            //if this socket lost
            else if(user.numCorrect < user.partner.numCorrect){
              socket.emit()
            }
          }
        }

      }
      //if incorrect and in timetrial mode
      else if(user.mode === 'timeTrial'){
        socket.emit('wrongCard', {});
      }
      //if not in timetrial mode
      else if(user.mode === 'accuracy'){
        socket
          .emit('newCard', user.cardArray[user.cardIndex]);
          user.cardIndex++;
      }
    }

  },

  startBattle: function(socket){
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
  }

}
