var objOut = {
  'english': [],

}

function Card(english, chinese, choiceArray){
  this.english = english;
  this.chinese = chinese;
  this.choiceArray = choiceArray;
}

objOut.english.push(new Card('hello', 'nihao', ['nihao', 'zaijian', 'gou', 'xin']));
objOut.english.push(new Card('goodbye', 'zaijian', ['nihao', 'zaijian', 'gou', 'xin']));
objOut.english.push(new Card('dog', 'gou', ['nihao', 'zaijian', 'gou', 'xin']));



module.exports = objOut;
