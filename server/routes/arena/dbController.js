// module.exports = function(err, client){
//   if(err) throw err;
//
//   client
//     .query('SELECT id,english,chinese FROM words;')
//     .on('row', function(row){
//       console.log(JSON.stringify(row));
//     });
// }
var pg = require('pg');
pg.defaults.ssl = true;


module.exports = {
  getRandCards : function(cb){
    var offset = getRandomInt(1, 90);
    pg.connect(process.env.DATABASE_URL, function(err, client){
      if(err) throw err;
      client
      .query('SELECT id,english,chinese FROM words limit 10 offset ' + offset)
      .on('row', function(row, result){
        result.addRow(row);
      })
      .on('end', function(result){
        cb(result);
      });
    });
  }


}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
