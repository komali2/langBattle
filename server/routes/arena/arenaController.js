ioController = require('./ioController.js');
var cardController = require('./cardController.js');
var cardList = [
  ['hello', 'nihao'],
  ['dog', 'gou'],
  ['goodbye', 'zaijian'],
  ['please', 'qing']
];

function User(id){
  this.id = id;
  this.cardIndex = 0;
  this.inBattle = false;
  this.roomNumber = null;
  this.hasPartner = false;
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
          stored.inBattle = true;
          user.inBattle = true;
          user.roomNumber = stored.roomNumber;
          openRoom++;
          break;
        }
      }
      //if no open users found, you are first. create new room
      if(!user.inBattle){
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

    socket.on('getFirstCard', ()=>{
      var user = userStorage[socket.id];

      if(user.inBattle){
        socket.emit('newCard', cardController.getFlashCard(user.cardIndex));
        user.cardIndex++;
      }
    });

    socket.on('submitCard', (data)=>{
      var user = userStorage[socket.id];
      if(user.inBattle){
        //if correct
        if(cardController.checkCorrect(data.english, data.chinese)){
          if(user.cardIndex < cardController.getSize()){
            socket
              .emit('newCard', cardController.getFlashCard(user.cardIndex));
            user.cardIndex++;
          }
          else if(user.cardIndex >= cardController.getSize()){
            var battleRoom = 'battleRoom' + user.roomNumber;
            socket.emit('youWin', {'youWon': 'youWon'});
            socket.broadcast.to(battleRoom).emit('youLose', {'youLost': 'youLost'});
          }
        }
        //if incorrect
        else{
          socket.emit('wrongCard', data.chinese);
        }

      }
      else{

      }

    });

    socket.on('youLost', ()=>{

    });

  },

}
