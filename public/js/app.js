(function() {
  //initialize variables
  var startButton = $('#start');
  var seconds = $('#seconds');
  var minutes = $('#minutes');
  var breakButton = $('#break');
  var isOnBreak = false;
  var timerInterval;
  // main functionality
  startButton.on('click', startTimer);
  breakButton.on('click',startBreak);
  //function definitions
  function startBreak (){
    // set that we are on break
    isOnBreak = true;
    // set the minutes to 5 minutes
    minutes.text('05');
    // set the seconds to 0 seconds
    seconds.text('00');
    // hide the break button
    breakButton.hide();
    // start the timer
    startTimer();
  }
  function startTimer(){
    console.log(timerInterval);
    if(!timerInterval){
        timerInterval = setInterval(countdown, 1000);
    }
  }
  function countdown(){
    var secondsText = seconds.text();
    var secondsTextAsNumber = parseInt(secondsText);
    var minutesText = minutes.text();
    var minutesTextAsNumber = parseInt(minutesText);
    // console.log(typeof secondsText);
    // console.log(typeof secondsTextAsNumber);
    if(minutesTextAsNumber === 0 && secondsTextAsNumber === 0){
      //stop!
      clearInterval(timerInterval); //this will stop the timer
      timerInterval = null;
      if(!isOnBreak){
        // disable the start button
        startButton.attr('disabled', true);
        // unhide the break button
        breakButton.show();
    }   else {
        minutes.text('25');
        seconds.text('00');
        startButton.attr('disabled',false);
        isOnBreak = false;
      }
      return;
    }
    if(secondsTextAsNumber === 0) {
      if(minutesTextAsNumber !== 0){
        var decreasedMinutesAsNumberByOne = minutesTextAsNumber - 1;
        var padMinutesTextAsNumber = pad(decreasedMinutesAsNumberByOne);
        minutes.text(padMinutesTextAsNumber);
      }
      //then change seconds text to 59
        seconds.text("59");

    } else {
      var decreasedSecondsAsNumberByOne = secondsTextAsNumber - 1;
      var padSecondsTextAsNumber = pad(decreasedSecondsAsNumberByOne);
      seconds.text(padSecondsTextAsNumber); //this writes inside of the html
    }

    // var secondsValue = parseInt(seconds.text());
    //
    // seconds.text(pad(secondsValue - 1));
  }

  function pad(num){
    if(num < 10){
      //spit out the number with a leading zero
      return "0" + num;
    } else {
      // spit out the original number
      return num;
    }
  }
}());
