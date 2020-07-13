
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var started = false;
var level = 0;

$(document).keydown(function(){
  if(!started) {
    $("#level-title").text("Level "+ level);
    nextSequence();
    started = true;
  }
});

  $(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    // console.log(userChosenColor);
    userClickPattern.push(userChosenColor);
    // console.log(userClickPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAns(userClickPattern.length - 1);
  });

function playSound(name) {
  var audio = new Audio("sounds/"+ name +".mp3");
  audio.play();
}
function animatePress(currColor) {
  $("#"+currColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currColor).removeClass("pressed");
  }, 100);

}
function nextSequence() {

  userClickPattern = [];

  level++;
  $("#level-title").text("Level "+ level);

  var randNum = Math.floor(Math.random() * 4); // gives you a random number from 0 - 3
  // console.log(randNum);
  var randChosenColor = buttonColors[randNum];
  // console.log(randChosenColor) ;
  gamePattern.push(randChosenColor);// used to record randomized sequence into an array val
  // console.log(gamePattern);

  $("#"+randChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);// used to animate the button press
  // var audio = new Audio("sounds/"+ randChosenColor +".mp3");
  // audio.play();
  playSound(randChosenColor);


}

function checkAns(currLv) {
  if(gamePattern[currLv] === userClickPattern[currLv]) {
    console.log("Success");

    if (userClickPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {
    console.log("Wrong");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press any key to restart");
    var input = $(document).keydown();
    startOver(input);
  }
}

function startOver(keyInput) {
  level = 0;
  gamePattern = [];
  started = false;

}




 // nextSequence();
