$(document).ready(function() {
  var timer = 5;

  var intervalId;

  var disableClick;

  function delayRestart() {
    disableClick = true;
    intervalId = setInterval(countDown, 1000);
  }

  function countDown() {
    timer--;

    $("#userScore").text(
      "You " +
        crystalGame.stateOfPlay +
        " -- Game will restart in " +
        timer +
        " seconds"
    );

    if (timer === 0) {
      crystalGame.stateOfPlay = "continue";
      timer = 1;
      clearInterval(intervalId);
      crystalGame.resetGame();
    }
  }
  //random generate numbers, computer guess, each crystal.....

  var crystalGame = {
    userWins: 0,
    userLosses: 0,
    bluecrystVal: 0,
    diamondVal: 0,
    tearVal: 0,
    circleVal: 0,
    targetScore: 0,
    userScore: 0,
    lowerLimitGame: 19,
    upperLimitGame: 120,
    lowerLimitCrystal: 1,
    upperLimitCrystal: 12,
    stateOfPlay: "continue",

    getRandomInteger: function(lowerLimit, upperLimit) {
      return Math.floor(
        Math.random() * (upperLimit - lowerLimit + 1) + lowerLimit
      );
    },

    resetGame: function() {
      this.userScore = 0;

      this.targetScore = this.getRandomInteger(
        this.lowerLimitGame,
        this.upperLimitGame
      );

      this.bluecrystVal = this.getRandomInteger(
        this.lowerLimitCrystal,
        this.upperLimitCrystal
      );
      this.diamondVal = this.getRandomInteger(
        this.lowerLimitCrystal,
        this.upperLimitCrystal
      );
      this.tearVal = this.getRandomInteger(
        this.lowerLimitCrystal,
        this.upperLimitCrystal
      );
      this.circleVal = this.getRandomInteger(
        this.lowerLimitCrystal,
        this.upperLimitCrystal
      );

      // values on the display
      $("#num2Guess").text(this.targetScore);
      $("#userScore").text("0");
      disableClick = false;
    },

    startGame: function() {
      //shows up for userScore, \

      this.userWins = 0;
      this.userLosses = 0;

      $("#numWins").text("Wins: 0");
      $("#numLosses").text("Losses: 0");
      $("#num2Guess").text(this.targetScore);
    },

    processStateOfPlay: function() {
      if (this.userScore == this.targetScore) {
        this.userWins++;
        $("#numWins").text("Wins: " + this.userWins);
        this.stateOfPlay = "won";
        $("#userScore").text(
          "You " +
            crystalGame.stateOfPlay +
            " -- Game will restart in " +
            timer +
            " seconds"
        );
        delayRestart();
      } else if (this.userScore > this.targetScore) {
        this.userLosses++;
        $("#numLosses").text("Losses: " + this.userLosses);
        this.stateOfPlay = "lost";
        $("#userScore").text(
          "You " +
            crystalGame.stateOfPlay +
            " -- Game will restart in " +
            timer +
            " seconds"
        );
        delayRestart();
      } else {
        this.stateOfPlay = "continue";
      }
    }
  };

  $(".gemstone").on("click", function() {
    if (disableClick) {
    } else {
      switch ($(this).attr("value")) {
        case "bluecryst":
          crystalGame.userScore += crystalGame.bluecrystVal;
          break;
        case "diamond":
          crystalGame.userScore += crystalGame.diamondVal;
          break;
        case "tear":
          crystalGame.userScore += crystalGame.tearVal;
          break;
        case "circle":
          crystalGame.userScore += crystalGame.circleVal;
          break;
        default:
          alert("Unknown gem!!");
          break;
      }
      $("#userScore").text(crystalGame.userScore);

      crystalGame.processStateOfPlay();
    }
  });

  crystalGame.startGame();
});
