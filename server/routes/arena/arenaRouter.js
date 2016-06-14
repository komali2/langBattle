var controller = require('./arenaController.js');

module.exports = function(router, io){
  router.get('/cards', controller.getCards);
}
