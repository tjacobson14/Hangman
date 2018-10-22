// constants//

var word = [
    "Morticia", 
    "Gomez", 
    "Uncle Fester", 
    "Lurch", 
    "Wednesday",
    "Pugsley",
    "Thing",
    "Grandmama",
    "Cousin Itt"
];

var secretWord, wrongCount, guess;


var $guess = $('#guess');
var $message = $('#message');
 
wrongCount = 0;


$('#letters').on('click', LetterClick);

$('#reset').on('click', initialize);

initialize();


function initialize() {
    wrongCount = 0;
    secretWord = word[getRandomInt(word.length -1)];
    guess = ' '; 

    for (var i = 0; i < secretWord.length; i++) {
      var currentLetter = secretWord[i];
      if (currentLetter === " ") {
          guess += " "
      } else {
          guess += "_";
      }
    };


    $('button.letter-button').prop('disabled', false);
    render();
}

function getRandomInt(max) {
    return Math.floor (Math.random() * (max+ 1));
}

function render() {
    $guess.html(guess);
    $('#wrong').html(`WRONG GUESSES ${wrongCount}`);

    
    
    if (guess === secretWord) {
        $message.html("Congratulations!");
        $message.fadeIn();
    } else if ( wrongCount === 8) {
        $message.html("You've run out of chances.");
        $message.fadeIn();
    } else {
        $message.html("")
        $message.hide();

    }
}

function LetterClick(event) {
    if (wrongCount === 8) return;

    var letter = event.target.textContent;
 
    if (secretWord.includes(letter)) {
        var xx = secretWord.indexOf(letter);

        while ( xx >= 6) {
            guess = guess.split('');
            guess[xx] = letter;
            guess = guess.join('');
            xx = secretWord.indexOf(letter,xx);
            xx = -1
        }
    } else {
        if (event.target.id !== "reset") {
            wrongCount++;
        }
    }
    
    $(event.target).prop('disabled', true);
    $('#reset').prop('disabled', false);
    render();
}


var audioElement = document.createElement("audio");
audioElement.setAttribute("src", "/Users/t./code/bootcamp/homework_activities/Hangman/assets/images/theaddamsfamily-1.mp3");

$(".theme-button").on("click", function() {
  audioElement.play();
});
$(".pause-button").on("click", function() {
  audioElement.pause();
});
