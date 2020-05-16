// creating the variables
var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".schedule");

var toDoItems = [];
// objects contain hour and text properties
 
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

//if we don't have any todos set up, let's set up the array of objects
function initializeSchedule(){
//  console.log(toDoItems);

//for each time block
  $timeBlocks.each(function(){
    var $thisBlock = $(this);
    var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

    var todoObj = {
      //set related todo hour to same as data-hour
      hour: thisBlockHr,
      //get text ready to accept string input
      text: "",
    }
    //add this todo object to todoitems array
    toDoItems.push(todoObj);
  });


// saving the array of objects to local storage via stringify
  localStorage.setItem("todos", JSON.stringify(toDoItems));
  console.log(toDoItems);
}


function renderSchedule(){
  
  toDoItems = localStorage.getItem("todos");
  toDoItems = JSON.parse(toDoItems);

//  loop through the toDoitems array
// create the variables to populate the toDoItems variables
  for (var i = 0; i < toDoItems.length; i++){
    var itemHour = toDoItems[i].hour;
    var itemText = toDoItems[i].text; 
   
    $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
  }

  console.log(toDoItems);
}

function saveHandler(){
  var $thisBlock = $(this).parent();

  var hourToUpdate = $(this).parent().attr("data-hour");
  var itemToAdd = (($(this).parent()).children("textarea")).val();

  //seeing which item that needs to update based which item we need to update based on the hour of the button clicked 
  for (var j = 0; j < toDoItems.length; j++){
    if (toDoItems[j].hour == hourToUpdate){
      //set its text to what was added to textarea
      toDoItems[j].text = itemToAdd;
    }
  }
  localStorage.setItem("todos", JSON.stringify(toDoItems));
  renderSchedule();
}

// prepping to document
$(document).ready(function(){

  //formating the timeblocks
  setUpTimeBlocks();
  //seeing if there is anything in local storage
  if(!localStorage.getItem("todos")){
    //initialize the objects array
    initializeSchedule();
  } //otherwise dont bother bc we get it from local storage

  //display current date
  $currentDay.text(currentDate);

  //render schedule from local storage
  renderSchedule();
  //when a todo item save button is clicked, save it
  $scheduleArea.on("click", "button", saveHandler);
  
});