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
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));

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

connection.query("INSERT into todolist (tasks) values ($1)", [req.body.newTask]);
res.send(taskObject);
done();

  }); //end pool.connect
}); //end app.post
