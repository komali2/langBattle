var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;
var pg = require('pg');
var db = require('./routes/arena/dbController.js');
//https://github.com/brianc/node-postgres/wiki/Query
//http://razorsql.com/articles/postgresql_limit_query.html
pg.defaults.ssl = true;


server.listen(port);
pg.connect(process.env.DATABASE_URL, db);

require('./middleware.js')(app, express, io);
