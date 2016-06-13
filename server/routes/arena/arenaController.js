var cardList = [
  ['hello', 'nihao'],
  ['dog', 'gou'],
  ['goodbye', 'zaijian'],
  ['please', 'qing']
]

module.exports = {
  getCards: function(req, res){
    console.log(req.query.num);
    if(cardList[req.query.num]){
      res.status(200).send(cardList[req.query.num]);
    }
    else{
      res.status(500).send("Couldn't find card for query, " + JSON.stringify(req.query));
    }
  }
}
