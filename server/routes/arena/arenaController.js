var cardList = {
  1: ['hello', 'nihao'],
  2: ['dog', 'gou'],
  3: ['goodbye', 'zaijian'],
  4: ['please', 'qing']
}

module.exports = {
  getCards: function(req, res){
    if(cardList[req.query.num]){
      res.status(200).send(cardList[req.query.num]);
    }
    else{
      res.status(500).send("Couldn't find card for query, " + req.query);
    }
  }
}
