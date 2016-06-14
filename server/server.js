var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;

server.listen(8080);


require('./middleware.js')(app, express, io);

io.on('connect', function(socket){
  console.log('a user has connected', socket.id);
  socket.on('chat', function(msg){
    console.log('message: ', msg);
  });

});
