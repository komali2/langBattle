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
}

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
    var userStorage = {};
    console.log('enter player: ', socket.id);
    socket.on('joinBattle', ()=>{
      socket.join('battleRoom', (err)=>{
        if(err){
          console.log(err);
        }
        userStorage[socket.id] = new User(socket.id);
        userStorage[socket.id].inBattle = true;
      });
    });

    socket.on('getNewCard', ()=>{
      if(userStorage[socket.id].inBattle){
        if(userStorage[socket.id].cardIndex < cardList.length){
          socket
            .emit('newCard', {card: cardList[userStorage[socket.id].cardIndex]});
          userStorage[socket.id].cardIndex++;
        }
        else if(userStorage[socket.id].cardIndex >= cardList.length){
          socket.emit('youWin', {'youWon': 'youWon'});
          socket.broadcast.to('battleRoom').emit('youLost', {'youLost': 'youLost'});
        }
      }
      else{

      }

    });

    socket.on('youLost', ()=>{

    });

  },

}
