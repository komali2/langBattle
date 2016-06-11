var controller = require(./arenaController.js);

module.exports = function(router){
  router.get('/cards', controller.getCards);
}
