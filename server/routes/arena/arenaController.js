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
        console.log(socket.id + ' is a member of these rooms: ' + JSON.stringify(socket.rooms));
        userStorage[socket.id] = new User(socket.id);
      });
    });

    socket.on('getNewCard', ()=>{
      console.log('got request for new card');
      console.log(socket.id);
      socket
        .emit('newCard', {card: cardList[userStorage[socket.id].cardIndex]});
      userStorage[socket.id].cardIndex++;
    });

  },

}
