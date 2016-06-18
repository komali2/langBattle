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
        shuffle(newArray[key].choiceArray);
      });
      cb(newArray);
    });
  }

}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}
