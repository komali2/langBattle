var cardStorage = require('./cardStorage.js').english;
var db = require('./dbController.js');

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
  },
  getCardArray: function(cb){
    db.getRandCards(function(cardArray){
      var newArray = cardArray.slice();
      newArray.forEach((el, key)=>{
        newArray[key].choiceArray = [];
        for(var i = 0; i < 4; i++){
          newArray[key].choiceArray.push(newArray[getRandomInt(0, 9)].chinese)
        }
        newArray[key].choiceArray.push(newArray[key].chinese);
      });
      cb(newArray);
    });
  }

}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
