var path = require('path');

module.exports = function(app, express){
  var arenaRouter = express.Router();

  app.use(express.static(path.join(__dirname, '../app')));
  app.use('/arena', arenaRouter);

  require('./routes/arena/arenaRouter.js')(arenaRouter);
};
