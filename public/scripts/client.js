
$(document).ready(onReady);
console.log('JQ sourced');

function onReady(){
  console.log('ready');

$('#submitTask').on('click', addTask);
getTasks();
$(document).on('click', '.deleteButton', deleteTask);
$(document).on('click', '.completeButton', completeTask);


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
  success:function(response){
    console.log('added task:', response);
    $('form').trigger('reset');
    getTasks();
  }//end success
});// end of ajax post
}// end addTask function


function getTasks(){
  console.log( 'in getTasks' );
  $.ajax({
    type: 'GET',
    url: '/getTasks',
    success: function( response ){
      console.log( 'back with:', response );
      // empty the container div
      $('#taskContainer').empty();
      // loop through the results
      for (var i = 0; i < response.length; i++) {
        // display on the DOM

        if( response[i].complete ){
          $('#taskContainer').append('<p>' + response[i].tasks + '</p>' );
        } else{
          $('#taskContainer').append('<p><b>' + response[i].tasks + '<b><button class="completeButton" data-id=' + response[i].id + '>Complete</button><button class="deleteButton" data-id=' + response[i].id + '>Delete</button></p>' );
        } // end else
      } // end for
    } // end success
  }); // end ajax
} //end getTasks

function deleteTask(){
console.log('deleting');
if(confirm('Would you like to delete this task?')=== true){
  var id = $(this).data('id');
  console.log(id);
  var idSending = {
    todolistId: id,
  };
  console.log(idSending);

  $.ajax({
    url: '/deleteTask',
    type: 'DELETE',
    data: idSending,
    success: function(response){
      console.log('delete from server:', response);
      getTasks();
    }//end success
  });//end ajax

} else{
console.log('Item will not be deleted');
}

}//end deleteTask function


function completeTask(){
    var id = $( this ).data( 'id' );
    console.log( id );
    // send this id
    var idSending = {
      todolistId: id,
    }; //end objectToSend
    $.ajax({
      type: 'POST',
      data: idSending,
      url: '/completeTask',
      success: function( response ){
        console.log( 'completed');
        getTasks();
      } // end success
    }); // end ajax

}//end completeTask function





}//end of onReady function
