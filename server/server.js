var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;
var db = require('./routes/arena/dbController.js');
require('events').EventEmitter.prototype._maxListeners = 100;
//https://github.com/brianc/node-postgres/wiki/Query
//http://razorsql.com/articles/postgresql_limit_query.html


server.listen(port);
//pg.connect(process.env.DATABASE_URL, db);

require('./middleware.js')(app, express, io);
