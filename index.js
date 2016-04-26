var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/dist')));


var port = process.env.PORT || 8080;

app.listen(port, function(){
  console.log("Up on port ", port);
});
