var ioController = require('./ioController.js');

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
