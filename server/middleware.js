var path = require('path');

module.exports = function(app, express){
  var http = require('http').Server(app);
  var io = require('socket.io')(http);

  app.use(express.static(path.join(__dirname, '../app')));

  io.on('connection', function(socket){
    console.log('a user connected');
  });

};
