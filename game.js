gamePattern = [];
buttonColours = ["red", "blue", "green", "yellow"];
userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function(event) {
  if (!started) {
    $("#level-title").text(level + " level");
    nextSequence();
    started = true;
  }
});

$('.btn').click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour)
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
    console.log("Success!");
    if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over! Press any key to restart!");
    $(document).keydown(function(event) {
      startOver()
    })
    }
};

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  nextSequence();
};

function nextSequence() {
userClickedPattern = [];

  level++;
  $("#level-title").text(level + " level");
  randomNumber =  Math.floor(Math.random()*4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(120).fadeIn(120);
  playSound(randomChosenColour);

};

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

};

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
      $("#" + currentColour).removeClass("pressed");
    }, 100);

};
