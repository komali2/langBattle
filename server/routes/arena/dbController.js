module.exports = function(err, client){
  if(err) throw err;

  client
    .query('SELECT id,english,chinese FROM words;')
    .on('row', function(row){
      console.log(JSON.stringify(row));
    });
}
