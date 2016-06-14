var controller = require('./arenaController.js');

module.exports = function(router, io){
  router.get('/cards', controller.getCards);

  io.on('connect', (socket)=>{
    socket.on('joinBattle', ()=>{
      console.log('player has joined battle');

    });
    console.log('yea he joined twice', socket.id);
  });
}
