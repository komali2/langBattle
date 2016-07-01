var ioController = require('./ioController.js');

module.exports = {

  ioConnect: function (socket){
    console.log('enter player: ', socket.id);
    socket.on('joinBattle', (data)=>{
      ioController.handleNewPlayer(socket, data);
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
