(function() {
  //initialize variables
  var startButton = $('#start');
  var seconds = $('#seconds');
  var minutes = $('#minutes');
  var breakButton = $('#break');
  var break15Button = $('#break15');
  var breaks = $('#totalBreaks');
  var rounds = $('#totalRounds');
  var body = $('body');
  var isOnBreak = false;
  var isOnBreak15 = false;
  var timerInterval;
  var numOfBreaks = 0;
  var numOfRounds = 0;
  break15Button.hide();
  // main functionality==========================
  startButton.on('click', startTimer);
  startButton.on('click',countRound);
  startButton.on('click',byeStart);
  startButton.on('click' , removeYellow);
  breakButton.on('click', startBreak);
  breakButton.on('click', countBreak);
  break15Button.on('click',startBreak15);
  break15Button.on('click',countBreak);
  break15Button.on('click', break15Yellow);
  //function definitions=========================

  // function count15Break(){
  //   // set is on break true
  //   isOnBreak = true;
  //   // set values for mins and seconds
  //   minutes.text('00');
  //   seconds.text('05');
  // }

  function removeYellow(){
    body.removeClass('yellow');
  }

  function break15Yellow (){
    body.addClass('yellow');
  }

  function byeStart(){
    startButton.hide();
  }
  function countBreak(){
    // // clicking the button raises numOfBreaks by 1
    ++numOfBreaks;
    //for each + numOfBreaks, increase counter by 1
    breaks.text(numOfBreaks);
    //if numOfBreaks is a multiple of 3, make a 15 min break button pop up
    if(numOfBreaks % 3 === 0){
      break15Button.show();
      startButton.hide();
      breakButton.hide();
    }else{
      break15Button.hide();
      // otherwise, it hides the button
    }
  }

  function countRound(){
    ++numOfRounds;
    rounds.text(numOfRounds);
  }
  function startBreak (){
    // set that we are on break
    isOnBreak = true;
    // if clicked, set that we are on break
    // set the minutes to 15
    // set the seconds to 00
    // hide the break button
    // start the timer
    // set the minutes to 5 minutes
    minutes.text('00');
    // set the seconds to 0 seconds
    seconds.text('03');
    // start the timer
    breakButton.hide();
    break15Button.hide();
    startTimer();
  }
  function startBreak15 (){
    // set that we are on break15
    isOnBreak15 = true;
    // set the minutes to 15
    minutes.text('00');
    // set the seconds to 00
    seconds.text('05');
    // hide the break15Button button
    break15Button.hide();
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

      if(!isOnBreak && !isOnBreak15){
        // disable the start button
        startButton.attr('disabled', true);
        startButton.hide();
        // unhide the break button
        breakButton.show();

    }   else {
        minutes.text('00');
        seconds.text('04');
        startButton.attr('disabled',false);
        startButton.show();
        isOnBreak = false;
        isOnBreak15 = false;
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
