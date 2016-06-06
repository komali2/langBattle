var express = require('express');
var app = express();

require('./middleware.js')(app, express);

var port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('Server up on port ', port);
});
