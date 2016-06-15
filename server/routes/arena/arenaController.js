ioController = require('./ioController.js');
var cardList = [
  ['hello', 'nihao'],
  ['dog', 'gou'],
  ['goodbye', 'zaijian'],
  ['please', 'qing']
]

function User(id){
  this.id = id;
  this.cardIndex = 0;
  this.inBattle = false;
  this.roomNumber = null;
}

var openRoom = 0;
var userStorage = {};



module.exports = {
  getCards: function(req, res){
    console.log(req.query.num);
    if(cardList[req.query.num]){
      res.status(200).send(cardList[req.query.num]);
    }
    else{
      res.status(500).send("Couldn't find card for query, " + JSON.stringify(req.query));
    }
  },

  ioConnect: function (socket){
    //socket.on('joinBattle', ioController.handleNewPlayer);
    console.log('enter player: ', socket.id);
    socket.on('joinBattle', ()=>{

      //create new user
      userStorage[socket.id] = new User(socket.id);
      var user = userStorage[socket.id];
      //find a user without a partner
      for(var ele in userStorage){
        var stored = userStorage[ele];
        if(!stored.inBattle && stored.id !== user.id){
          console.log('loop ele is', stored, 'user is', user);
          stored.inBattle = true;
          user.inBattle = true;
          user.roomNumber = stored.roomNumber;
          openRoom++;
          break;
        }
      }
      //if no open users found, you are first. create new room
      if(!user.inBattle){
        console.log('we entered inBattle check', user);
        user.roomNumber = openRoom;
      }

      var battleRoom = 'battleRoom' + user.roomNumber;
      //put user in the socket room
      socket.join(battleRoom, (err)=>{
        if(err){
          console.log(err);
        }
      });
    });

    socket.on('getNewCard', ()=>{
      var user = userStorage[socket.id];
      if(user.inBattle){
        if(user.cardIndex < cardList.length){
          socket
            .emit('newCard', {card: cardList[user.cardIndex]});
          user.cardIndex++;
        }
        else if(user.cardIndex >= cardList.length){
          var battleRoom = 'battleRoom' + user.roomNumber;
          socket.emit('youWin', {'youWon': 'youWon'});
          console.log(userStorage);
          console.log(openRoom);
          socket.broadcast.to(battleRoom).emit('youLose', {'youLost': 'youLost'});
        }
      }
      else{

      }

    });

    socket.on('youLost', ()=>{

    });

  },

}
