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
        for(var i = 0; i < 3; i++){
          var rand = getRandomInt(0, 9);
          newArray[key]
            .choiceArray
            .push({
              chinese: newArray[rand].chinese,
              id: newArray[rand].id});
        }
        newArray[key]
          .choiceArray
          .push({
            chinese: newArray[key].chinese,
            id: newArray[key].id});
      });
      cb(newArray);
    });
  }

}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
