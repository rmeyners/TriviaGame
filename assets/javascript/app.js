$(document).ready(function(){

$('#timer').hide();
var count = 30;
var correctCount = 0;
var incorrectCount = 0;
var unanswered = 0;
$('#questionContainer').hide();
$('#submit').hide();
$('#restartBtn').hide();
var form = $('#questionForm');
var counter;
var questions = [{
    question: "Who is the oldest team in the NFL?",
    choices: ['Giants', 'Bears', 'Packers', 'Cardinals'],
    correctAnswer: 'Cardinals'
  }, {
    question: "What team has the most NFl titles?",
    choices: ['Steelers', 'Browns', 'Cowboys', 'Packers'],
    correctAnswer: 'Packers'
  }, {
    question: "Who is the winnigest QB in NFL history?",
    choices: ['Tom Brady', 'Vinny Testaverde', 'Joe Montana', 'Terry Bradshaw'],
    correctAnswer: 'Tom Brady'
  }, {
    question: "Who is the youngest franchise in the NFL?",
    choices: ['Carolina Panthers', 'Houston Texans', 'Jacksonville Jaguars', 'Seattle Seahawks'],
    correctAnswer: 'Jacksonville Jaguars'
  }, {
    question: "What year was the first Super Bowl?",
    choices: ['1974', '1967', '1959', '1981'],
    correctAnswer: '1967'
  }];


	function startGame(){

		$('#startBtn').on('click', function(){
			$('#startBtn').hide();
			$('#restartBtn').hide();
			$('#timer').show();
			$('#questionContainer').show();
			$('#submit').show();

			timer();
		});

		form.on("submit", onSubmit);

		$('#scores').hide();
	}

	function timer(){

		$('#timer').html("Play Clock: " + count + " seconds");

		if (count <= 0) {
			onSubmit();
		} else {
			count--;
			counter = setTimeout(timer, 1000);
		}
	}

	function displayQuestions(){

		for (var i=0; i < questions.length; i++) {

			var questionDisp = $('<p>').html(questions[i].question);
	
			var choiceDisp = $('<div>');
	
				questions[i].choices.forEach(function(choice) {
					choiceDisp.append(
						$('<label class="choice">')
						.append($('<input type="radio" name="ques' + i + '" value="' + choice + '"/>'))
						.append(choice)
					)
				});

				$('#questionContainer').append(
					$('<div class="question">')
					.append(questionDisp)
					.append(choiceDisp)
				);
		}
	}

	function onSubmit(){

		clearTimeout(counter);

		for (var i = 0; i < questions.length; i ++) {

		 	// console.log("questions", questions[i].correctAnswer);
		 	// console.log("value", form[0]['ques' + i].value);

		 	if (form[0]['ques' + i].value === ""){
		 		unanswered++;
		 		$('#incomplete').html(unanswered);
		 	}
			else if (questions[i].correctAnswer == form[0]['ques' + i].value) {
				correctCount++;
				$('#touchdowns').html(correctCount);
			}
			else {
				incorrectCount++;
				$('#interceptions').html(incorrectCount);
			}
			
		}

		$('#submit').hide();
		$('#questionContainer').hide();
		$('#scores').show();
		$('#restartBtn').show();
		return false;

	}

	function restartGame(){

		$('#restartBtn').on('click', function(){
			console.log('I\'M HERE');
			location.reload(true);
		});

	}

displayQuestions();
startGame();
restartGame();

});