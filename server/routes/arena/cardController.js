var db = require('./dbController.js');

module.exports = {

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
              french: newArray[rand].french,
              spanish: newArray[rand].spanish,
              chinese: newArray[rand].chinese,
              english: newArray[rand].english,
              id: newArray[rand].id});
        }
        newArray[key]
          .choiceArray
          .push({
            french: newArray[key].french,
            spanish: newArray[key].spanish,
            english: newArray[key].english,
            chinese: newArray[key].chinese,
            id: newArray[key].id});
        shuffle(newArray[key].choiceArray);
        console.log(newArray);
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
