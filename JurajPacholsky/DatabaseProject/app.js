const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/book', (req , res) => {
  res.send(con.query('SELECT * FROM users_name'))
});

var mysql = require('mysql');

// creating a connection to the db
var con = mysql.createConnection({
  host: 'freedb.tech',
  user: 'freedbtech_juuuuuurrrrkkkkooooo',
  password: 'deamOOnko10',
  database: 'freedbtech_jjjjjjjjjjjuuuuurrrrrkkkooooo',
});

con.connect(function(err) {
  if(err){
    console.log('Error connecting to DB');
    return;
  }
  console.log('Connection established');
});

con.query('SELECT * FROM table', function(err, results) {
  if(err){
    console.log('Query error: ', err);
    return;
  }
  console.log(results);
});


app.listen(3001 , () => console.log('server is running') );