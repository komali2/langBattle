var ioController = require('./ioController.js');
var storage = require('./storage.js');

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
      if(storage.userStorage[socket.id].mode === 'timeTrial'){
        ioController.submitCard(socket, data);
      }
      else if(storage.userStorage[socket.id].mode === 'accuracy'){
        ioController.accuracyHandleSubmit(socket, data);
      }
    });

    socket.on('youLost', ()=>{
    });

    socket.on('startBattle', ()=>{
      ioController.startBattle(socket);
    })

  },

}
