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

      ioController.getFirstCard(socket);
    });

    socket.on('submitCard', (data)=>{
      ioController.submitCard(socket, data);
    });



    socket.on('youLost', ()=>{

    });

    socket.on('startBattle', ()=>{
      ioController.startBattle(socket);
    })

  },

}
