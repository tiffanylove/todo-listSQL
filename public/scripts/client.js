
$(document).ready(onReady);
console.log('JQ sourced');

function onReady(){
  console.log('ready');

$('#submitTask').on('click', addTask);

$(document).on('click','.deleteButton', deleteTask);
$(document).on('click','.completeButton', completeTask);



function addTask(){
  // will collect info from input into an object to be sent to DB.

  var taskObject = {
    newTask: $('#tasks').val()
  };
  console.log('new task added');

$.ajax({
  url: '/addTask',
  type: 'POST',
  data: taskObject,
  success:function(data){
    console.log('added task:', data);
    $('form').trigger('reset');
    getTasks();
  }//end success
});// end of ajax post
}// end addTask function

function getTasks(){
  console.log('getTasks');

//ajax call to get tasks and display on DOM
$.ajax({
  url: '/getTasks',
  type: 'GET',
  success: function(response){
    console.log('get some tasks:', response);

    //after we get task, display to DOM
    for (var i = 0; i < response.length; i++) {
    $('#taskContainer').append('<p class = "item">' + response[i].tasks + '' + '<button class = "deleteButton">Delete</button>' + '' + '<button class = "completeButton">Complete</button>' + '</p>');
    }

  }
});//end ajax get

}// end getTasks function


function completeTask(){

}//end completeTask function

function deleteTask(){
console.log('deleting');
if(confirm('Would you like to delete this task?')=== true){
  var id = $(this).parent().data('id');
  console.log(id);
  var itemSending = {
    todolistId: id,
  };
  console.log(itemSending);

  $.ajax({
    url: '/deleteTask',
    type: 'DELETE',
    data: itemSending,
    success: function(response){
      console.log('delete from server:', response);

    }//end success
  });//end ajax

} else{
console.log('Item will not be deleted');
}

}//end deleteTask function


// function emptyInput(){
// $('#tasks').val('');
// }

function willDelete(){
  if(confirm('Would you like to delete this task?')=== true){
    deleteTask();
  }else{
    console.log('Will not delete');
  }
}




}//end of onReady function
