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
  handleNewPlayer: function(socket){
    //create new user
    storage.userStorage[socket.id] = new User(socket.id);
    var user = storage.userStorage[socket.id];
    //find a user without a partner
    for(var ele in storage.userStorage){
      var stored = storage.userStorage[ele];
      if(!stored.inBattle && stored.id !== user.id){
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
  }
}
