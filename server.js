//requires
var express = require ('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

//globals
var port = 4000;

// set up config for the pool
var config = {
  database: 'todo',
  host: 'localhost',
  port: 5432,
  max: 10
};
//uses
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));

// create new pool using config
var pool = new pg.Pool(config);

//spin up the server
app.listen(port, function(){
  console.log('server up on', port);
});

//base url
app.get('/', function(req, res){
  console.log('base url hit');
  res.sendFile(path.resolve('public/views/index.html'));
});


app.post('/addTask', function(req, res){
  console.log('addTask route hit');

  var taskObject = {
    response:('from addTask route', req.body)

  };//end taskObject
  pool.connect(function(err, connection, done){
    if(err){
      console.log(err);
      //respond
      res.send(400);
    } else{
      console.log('connected');
    } //end else

connection.query("INSERT into todolist (tasks, activetask) values ($1, $2)", [req.body.newTask, true]);
res.send(taskObject);
done();
  }); //end pool.connect
}); //end app.post

app.get('/getTasks', function(req, res){
  console.log('getTasks route hit');
  //empty array
  var allTasks = [];
  //connect to DB
  pool.connect(function(err, connection, done){
    if(err){
      console.log(err);
      //respond
      res.send(400);
    } else{
      console.log('connected!');
      //Tells array to push row into empty array
      var resultSet = connection.query("SELECT * from todolist");
      resultSet.on('row', function(row){
        console.log('running?', row);
        allTasks.push(row);
      }); //end row
      //on 'end', call the new array
      resultSet.on('end', function(){
        console.log('allTasks -->', allTasks);
        res.send(allTasks);

        done();
      });// on end

    }// end else
  }); //end pool.connect
}); //end app.get

app.delete('/deleteTask', function(req, res){
  console.log('add delete route');
    pool.connect(function(err, connection, done){
      if(err){
        console.log(err);
        res.send(400);
      }else{
        console.log('connected');

        connection.query( "DELETE FROM todolist WHERE id=$1", [req.body.id]);
      res.send(200);
      done();
        }//end else
    }); //end pool.connect
  }); //end app.post


  app.post( '/completeTask', function( req, res ){
  console.log( 'complete:', req.body );
  pool.connect(function(err, connection, done){
    if(err){
      console.log(err);
      //response
      res.send(400);
    } else{
      console.log('connected');

      connection.query( "UPDATE todolist SET activetask=false WHERE id=$1", [req.body.id] );

      res.send(200);
      done();
      }  //end else
    }); // end pool.connect
  });
