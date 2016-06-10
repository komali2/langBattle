var express = require('express');
var app = express();

require('./middleware.js')(app, express);

var port = process.env.PORT || 8080;

var server = app.listen(port);
var io = require('socket.io').listen(server);
io.on('connect', function(socket){
  console.log('a user has connected');
  socket.on('chat', function(msg){
    console.log('message: ', msg);
  });
});
