//express framework
var express = require('express');
var app = express();

//mysql and cors check
var mysql = require('mysql');
const cors = require('cors');
app.use(cors());

//body parser
app.use(express.json());
app.use(express.urlencoded());

//information about database
var conn = mysql.createConnection({
    host : 'freedb.tech',
    user : 'freedbtech_juuuuuurrrrkkkkooooo',
    password : 'deamOOnko10',
    database : 'freedbtech_jjjjjjjjjjjuuuuurrrrrkkkooooo'
});

//connect to database
conn.connect();

//Get all items from database
app.get('/todolist', function(request, response){
    conn.query('select * from todolist', function(error, results){
        if ( error ){
            response.status(400).send('Error in database operation');
        } else {
            response.send(results);
        }
    });
});

//Delete item from database
app.delete('/deleteById/:id' , function(request, response){
    conn.query('delete from todolist WHERE id =' + request.params.id, function(error , results){
        if(error) {
            response.status(400).send('Error in database')
        }else{
            response.send(results)
        }
    })
})

//Change done value to true
app.put('/updateById/:id' , function(request, response){
    conn.query('update todolist set done= "true" where id=' + request.params.id, function(error , results){
        if(error) {
            response.status(400).send('Error in database')
        }else{
            response.send(results)
        }
    } )
})

//Change done value to false
app.put('/updateToUndoneById/:id' , function(request, response){
    conn.query('update todolist set done= "false" where id=' + request.params.id, function(error , results){
        if(error) {
            response.status(400).send('Error in database')
        }else{
            response.send(results)
        }
    } )
})

//Get item byt id
app.get('/todolist/:id', function(request, response){

    conn.query('select * from todolist WHERE id =' + request.params.id, function(error, results){
        if ( error ){
            response.status(400).send('Error in database operation');
        } else {
            response.send(results);
        }
    });
});

//Create new item to database
app.post('/todolist/newitem' , function(request, response){
    conn.query('INSERT INTO todolist SET ?',request.body,  function(error , results){
        if(error) {
            response.status(400).send('Error in database')
        }else{
            response.send(results)
        }
    } )
})

//server listen
app.listen(3306, function () {
    console.log('Express server is listening on port 3306');
});