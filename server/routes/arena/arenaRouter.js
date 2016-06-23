var controller = require('./arenaController.js');

module.exports = function(router, io){


  io.on('connect', controller.ioConnect);
}
