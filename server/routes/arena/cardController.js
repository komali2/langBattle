var cardStorage = require('./cardStorage.js').english;

module.exports = {
  getFlashCard: function(index){
    return cardStorage[index];
  },
  getSize: function(){
    return cardStorage.length;
  },
  checkCorrect: function(english, chinese){
    var check = false;
    for(var i = 0; i < cardStorage.length; i++){
      if(cardStorage[i].english === english && cardStorage[i].chinese === chinese){
        check = true;
      }
    }
    return check;
  }

}
