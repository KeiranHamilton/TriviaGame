// Page timer is set to 60 seconds

// Get countdown to start at 60 seconds
var count = 60;

// keeping track of answers here
var correctCount = 0;
var wrongCount = 0;
var unansweredCount = 0;

// Game functions and operations
$(document).ready(function () {
  // TimeOut page after 1 minute 60seconds)
  //

  // hide my quiz page and result page
  $("#mid_game_container").hide();
  $("#end_container").hide();

  // Set Scroll position
  window.scrollTo(0, 500);

  $("#start_button").on("click", function () {
    // Hide the start box
    $("#start_container").hide();

    // Show the panther questions
    $("#mid_game_container").show();

    startCountdown();
    return;
  });

  // Counts down and displays the time to the user
  function countdown() {
    // Decrement the counter, down from 60 seconds
    count--;

    // Display the count in the game
    $("#timer_number").html(count + " Seconds");

    // User finishes before time is up and clicks done
    $("#done_button").on("click", function () {
      count = 0;
      return;
    });

    // Finish the game after the timer reaches 0
    if (count == -1) {
      // Collect the radio inputs
      timeUp();

      // Hide the game Div from the user
      $("#mid_game_container").hide();
    }
  }

  // Show the countdown, increment is 1 second
  function startCountdown() {
    setInterval(countdown, 1000);
  }

  // Function to be run after the timer is up
  function timeUp() {
    // Check  for wrong and right answers
    var Q1 = $('input:radio[name="q1"]:checked').val();
    var Q2 = $('input:radio[name="q2"]:checked').val();
    var Q3 = $('input:radio[name="q3"]:checked').val();
    var Q4 = $('input:radio[name="q4"]:checked').val();
    var Q5 = $('input:radio[name="q5"]:checked').val();

    // Determine the right/wrong/unanswered counts ( This count be a lot more DRY :/ )
    if (Q1 == undefined) {
      unansweredCount++;
    } else if (Q1 == "1995") {
      correctCount += 10;
    } else {
      wrongCount++;
    }

    if (Q2 == undefined) {
      unansweredCount++;
    } else if (Q2 == "#1") {
      correctCount++;
    } else {
      wrongCount++;
    }

    if (Q3 == undefined) {
      unansweredCount++;
    } else if (Q3 == "DJ Moore") {
      correctCount++;
    } else {
      wrongCount++;
    }

    if (Q4 == undefined) {
      unansweredCount++;
    } else if (Q4 == "3") {
      correctCount++;
    } else {
      wrongCount++;
    }

    if (Q5 == undefined) {
      unansweredCount++;
    } else if (Q5 == "David Tepper") {
      correctCount++;
    } else {
      wrongCount++;
    }

    // After quiz show the score results
    $("#correct_answers").html(correctCount);
    $("#wrong_answers").html(wrongCount);
    $("#unanswered").html(unansweredCount);

    // Show the completed Score Div
    $("#end_container").show();

    // auto Scroll for page
    window.scrollTo(0, 550);
  }
});