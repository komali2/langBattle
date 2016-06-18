var path = require('path');

module.exports = function(app, express, io, pg){
  var arenaRouter = express.Router();

  app.use(express.static(path.join(__dirname, '../app')));
  app.use('/arena', arenaRouter);

  require('./routes/arena/arenaRouter.js')(arenaRouter, io, pg);
};
