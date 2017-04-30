
$(document).ready(onReady);
console.log('JQ sourced');

function onReady(){
  console.log('ready');

$('#submitTask').on('click', addTask);



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
  }//end success
});// end of ajax post
}// end addTask function









}//end of onReady function
