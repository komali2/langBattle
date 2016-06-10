var path = require('path');

module.exports = function(app, express){
  var http = require('http').Server(app);

  app.use(express.static(path.join(__dirname, '../app')));

};
